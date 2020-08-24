using Microsoft.AspNetCore.Mvc;
using PhotosUploader.Handlers.Photos;
using PhotosUploader.ViewModels.Photos;
using System;
using System.Threading.Tasks;

namespace PhotosUploader.Controllers
{
    public class PhotosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromServices]CreatePhotoHandler handler, CreatePhotoModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(false);
            }

            //throw new NotImplementedException();
            //await handler.Handle(model);
            return Json(true);
        }
    }
}
