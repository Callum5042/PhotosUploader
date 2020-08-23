using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PhotosUploader.Infrastructure;
using PhotosUploader.Models.DataAccess;
using System;
using System.Linq;
using System.Reflection;

namespace PhotosUploader
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<PhotosUploaderContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("PhotosUploader")));

            InjectServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private void InjectServices(IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            foreach (var type in assembly.GetTypes().Where(x => x.CustomAttributes.Any(a => a.AttributeType == typeof(InjectAttribute))))
            {
                var attribute = (InjectAttribute)Attribute.GetCustomAttribute(type, typeof(InjectAttribute));
                if (attribute.Interface != null)
                {
                    if (attribute.Class != null)
                    {
                        services.AddTransient(attribute.Interface, attribute.Class);
                    }
                    else
                    {
                        services.AddTransient(attribute.Interface, type);
                    }
                }
                else
                {
                    services.AddTransient(type);
                }
            }
        }
    }
}
