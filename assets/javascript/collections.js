var fs = require('fs');
var path = require('path');
const yaml = require('js-yaml');
const fm = require('front-matter')

let collections = {}
collections.content = []
var walk = function(dir, done) {
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, collections);
        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        collections[Object.keys(res)[0]] = Object.values(res)[0]; // Assign collection directly
                        if (!--pending) done(null, collections);
                    });
                } else {
                    let local_path = (file.replace(/^.*\/content\/(.*?)\.md$/, '/$1')).replace("_index", "");
                    let doc = fm(fs.readFileSync(file, 'utf8'));
                    let obj = {
                        title: doc.attributes.title,
                        path: local_path,
                        description: doc.attributes.description,
                        thumbnail_image: doc.attributes.thumbnail_image,
                        profile_image: doc.attributes.profile_image,
                        badge_label: doc.attributes.badge_label,
                        alternate_url: doc.attributes.alternate_url,
                        link_target: doc.attributes.link_target,
                        role: doc.attributes.role,
                        name: doc.attributes.name,
                        major: doc.attributes.major,
                        graduation_year: doc.attributes.graduation_year,
                        author: doc.attributes.author,
                        publish_date: doc.attributes.publish_date,
                        contact_details: doc.attributes.contact_details,
                        excerpt: doc.body.slice(0, doc.body.indexOf("\n")),
                        content: doc.body,
                        type: doc.attributes.type
                    }
                    let collection_name = path.basename(dir); // Get directory name as collection name
                    if (doc.attributes.title != "Components") {
                      if (file.toLowerCase().endsWith("_index.md")) {
                        collections.content.push(obj);
                      } else {
                          if (!collections[collection_name]) {
                            collections[collection_name] = []; // Initialize collection if not exists
                          }
                          collections[collection_name].push(obj);
                      }
                  }
                    if (!--pending) done(null, collections);
                }
            });
        });
    });
};

walk("./content", function(err, results) {
    if (err) throw err;

    Object.keys(results).forEach(key => {
        if (Array.isArray(results[key])) {
          results[key].sort((a, b) => (a.title.toLowerCase()).localeCompare(b.title.toLowerCase()));
        }
      });

    fs.writeFile('./data/collections.json', JSON.stringify(results), err => {
      if (err) {
        console.error(err);
      } else {
        console.log("File written successfully")
      }
    });

    let collections = Object.keys(results)
    fs.writeFile('./data/collections_names.json', JSON.stringify(collections), err => {
        if (err) {
          console.error(err);
        } else {
          console.log("File written successfully")
        }
    });
});


function extractTopLevelTitles(nav) {
  const topLevelTitles = [];
  nav.forEach(link => {
      if (link.sub_nav_links && link.sub_nav_links.length > 0) {
          topLevelTitles.push(link.text);
      }
  });
  return topLevelTitles;
}

let nav = fs.readFileSync("./data/nav.yml", 'utf8');
nav = yaml.load(nav)

const topLevelTitles = extractTopLevelTitles(nav.nav_links);
fs.writeFile('./data/nav_section_names.json', JSON.stringify(topLevelTitles), err => {
  if (err) {
    console.error(err);
  } else {
    console.log("File written successfully")
  }
});
