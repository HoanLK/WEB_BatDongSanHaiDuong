using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;
using CMS.Areas.Admin.Models;
using System.Globalization;

namespace CMS.APIs
{
    public class PostAPIController : ApiController
    {
        private const string _dateFormat = "dd-MM-yyyy";
        private BDSHDEntities db = new BDSHDEntities();

        // GET: api/PostAPI
        public IQueryable<Post> GetPosts()
        {
            return db.Posts;
        }

        //Get for ModelView
        // GET: api/PostAPI
        //public IQueryable<PostViewModel> GetPosts(bool viewmodel, string type)
        //{
        //    if (viewmodel)
        //    {
        //        if (type == "table")
        //        {
        //            var model = (
        //                from cp in db.Posts
        //                orderby cp.TimeCreated descending
        //                select new PostViewModel()
        //                {
        //                    Id = cp.Id,
        //                    CategoryId = cp.CategoryId,
        //                    Featured = cp.Featured,
        //                    Published = cp.Published,
        //                    TimeCreated = cp.TimeCreated,
        //                    Title = cp.Title,
        //                    Views = cp.Views
        //                }
        //            );

        //            return model;
        //        }
        //    }

        //    return null;
        //}

        //Get for ModelView
        // GET: api/PostAPI
        public IQueryable<PostViewModel> GetPosts(bool? published, string startDate, string endDate )
        {
            
            var model = (
                from p in db.Posts
                orderby p.TimeCreated descending
                select new PostViewModel()
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    Featured = p.Featured,
                    Published = p.Published,
                    TimeCreated = p.TimeCreated,
                    Title = p.Title,
                    Views = p.Views
                }
            );

            if (published != null)
            {
                model = model.Where(p => p.Published == published);
            }

            if (DateTime.TryParse(startDate, out DateTime startDateConverted))
            {
                model = model.Where(p => p.TimeCreated >= startDateConverted);
            }

            if (DateTime.TryParse(endDate, out DateTime endDateConverted))
            {
                model = model.Where(p => p.TimeCreated <= endDateConverted);
            }

            return model;
        }

        // GET: api/PostAPI/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        // PUT: api/PostAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPost(int id, Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            db.Entry(post).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PostAPI
        [ResponseType(typeof(Post))]
        public IHttpActionResult PostPost(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Posts.Add(post);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = post.Id }, post);
        }

        //Delete 1 record
        // DELETE: api/PostAPI/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePost(int id)
        {
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            db.SaveChanges();

            return Ok(post);
        }

        //Delete list
        // DELETE: api/PostAPI?ids=...
        public int DeletePost(string ids)
        {
            var listIds = ids.Split(',');
            List<Post> posts = new List<Post>();

            foreach (var item in listIds)
            {
                if (int.TryParse(item, out int id))
                {
                    var post = db.Posts.Find(id);
                    if (post != null)
                    {
                        posts.Add(post);
                    }
                }
            }

            db.Posts.RemoveRange(posts);

            try
            {
                db.SaveChanges();
                return 1;
            }
            catch (Exception)
            {
                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }
    }
}