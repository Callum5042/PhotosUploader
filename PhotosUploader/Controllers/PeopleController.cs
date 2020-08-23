using Microsoft.AspNetCore.Mvc;
using PhotosUploader.Handlers.People;
using PhotosUploader.ViewModels.People;
using System.Threading.Tasks;

namespace PhotosUploader.Controllers
{
    public class PeopleController : Controller
    {
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromServices]CreatePersonHandler handler, CreatePersonModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            await handler.Handle(model);
            return RedirectToAction("Home", "Index");
        }
    }
}
