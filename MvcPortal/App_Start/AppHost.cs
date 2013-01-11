using System;
using System.Linq;
using System.Configuration;
using System.Collections.Generic;
using System.Web.Mvc;
using Funq;
using MvcPortal.Models;

using MvcPortal.ServiceLogic;
using ServiceStack.Common;
using ServiceStack.Common.Web;
using ServiceStack.Configuration;
using ServiceStack.CacheAccess;
using ServiceStack.CacheAccess.Providers;
using ServiceStack.FluentValidation;
using ServiceStack.Mvc;
using ServiceStack.OrmLite;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Admin;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.ServiceInterface.ServiceModel;
using ServiceStack.WebHost.Endpoints;

[assembly: WebActivator.PreApplicationStartMethod(typeof(MvcPortal.App_Start.AppHost), "Start")]

//IMPORTANT: Add the line below to MvcApplication.RegisterRoutes(RouteCollection) in the Global.asax:
//routes.IgnoreRoute("api/{*pathInfo}"); 

/**
 * Entire ServiceStack Starter Template configured with a 'Hello' Web Service and a 'Todo' Rest Service.
 *
 * Auto-Generated Metadata API page at: /metadata
 * See other complete web service examples at: https://github.com/ServiceStack/ServiceStack.Examples
 */

namespace MvcPortal.App_Start
{
	//A customizeable typed UserSession that can be extended with your own properties
	//To access ServiceStack's Session, Cache, etc from MVC Controllers inherit from ControllerBase<CustomUserSession>
	public class CustomUserSession : AuthUserSession
	{
		public string CustomProperty { get; set; }
	}

	public class AppHost: AppHostBase
	{		
		public AppHost() //Tell ServiceStack the name and where to find your web services
			: base("Mvc Portal", typeof(MessageService).Assembly) { }

		public override void Configure(Funq.Container container)
		{
            //Set JSON web services to return idiomatic JSON camelCase properties
            ServiceStack.Text.JsConfig.EmitCamelCaseNames = true;
            ControllerBuilder.Current.SetControllerFactory(new FunqControllerFactory(container));
            var appSettings = new AppSettings();
            var connString = appSettings.Get("SQLSERVER_CONNECTION_STRING",
                                             ConfigUtils.GetConnectionString("UserAuth"));
            container.Register<IDbConnectionFactory>(
                new OrmLiteConnectionFactory(connString, SqlServerDialect.Provider));

            

            //Using an in-memory cache
            container.Register<ICacheClient>(new MemoryCacheClient());
            ConfigureAuth(container);
            var dbFactory = container.Resolve<IDbConnectionFactory>();
            dbFactory.Run(d => d.CreateTableIfNotExists<UserAuth>());
            dbFactory.Run(db => db.CreateTableIfNotExists<Message>());
            dbFactory.Run(d => d.CreateTableIfNotExists<Device>());

            SetConfig(new EndpointHostConfig
            {
                DefaultContentType = ContentType.Json,
                EnableFeatures = Feature.All.Remove(Feature.Html).Remove(Feature.Xml),
                AppendUtf8CharsetOnContentTypes = new HashSet<string> { ContentType.Json }
            });
            //Or if Haz Redis
            //container.Register<ICacheClient>(new PooledRedisClientManager());
		}

       

	    private void ConfigureAuth(Container container)
        {
            var appSettings = new AppSettings();

            Plugins.Add(new AuthFeature(
               () => new AuthUserSession(),
               new IAuthProvider[] {
                    new CredentialsAuthProvider(),              //HTML Form post of UserName/Password credentials
                    new BasicAuthProvider(),                    //Sign-in with Basic Auth
                }));

            //Provide service for new users to register so they can login with supplied credentials.
            Plugins.Add(new RegistrationFeature());
            //override the default registration validation with your own custom implementation
            //container.RegisterAs<CustomRegistrationValidator, IValidator<Registration>>();

            //Store User Data into the referenced SqlServer database

            container.Register<IUserAuthRepository>(c =>
                 new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

            var userRep = (OrmLiteAuthRepository)container.Resolve<IUserAuthRepository>();
            //If using and RDBMS to persist UserAuth, we must create required tables
            if (appSettings.Get("RecreateAuthTables", false))
                userRep.DropAndReCreateTables(); //Drop and re-create all Auth and registration tables
            else
                userRep.CreateMissingTables();   //Create only the missing tables

            //Add a user for testing purposes
            string hash;
            string salt;
            string password = "Nomvete";
            new SaltedHash().GetHashAndSaltString(password, out hash, out salt);
            userRep.CreateUserAuth(new UserAuth
            {
                Id = 1,
                DisplayName = "DisplayName",
                Email = "as@if.com",
                UserName = "User1",
                FirstName = "FirstName",
                LastName = "LastName",
                PasswordHash = hash,
                Salt = salt,
            }, password);




            Plugins.Add(new RequestLogsFeature());
        }

		public static void Start()
		{
			new AppHost().Init();
		}
	}
}