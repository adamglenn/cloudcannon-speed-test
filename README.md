# West Virginia University Proof of Concept

This is intended to be a recreation of the current site, but with editing functionality for within CloudCannon. It has been built with Hugo and uses an external library for any content that should be shared between sites.

View a [live preview](https://urbane-nature.cloudvent.net/) or start editing in [CloudCannon](https://app.cloudcannon.com/46861/editor#projects/7346/sites)

## Local development

When developing locally the [WVU-POC-common](https://github.com/Enterprise-Success/WVU-POC-common) module is, by defualt, pulled from the main branch of the site within github.

In order for that to be succesfull you need to configure it to use ssh by:

- Setting up ssh for your computer following the [GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) (if you havent already)

- Add the following content to your gitconfig so ssh will always be used over http:

    ```
        [url "ssh://git@github.com/"]
            insteadOf = https://github.com/
        [user]
            name = <Your Name>
            email = <Your GitHub Email>
    ```

    NOTE: This can go in your global (`~/.gitconfig`) or local (`WVU-POC/.git/config`) git config file.

### Prerequisites
Install hugo

### Local Quickstart

`npm i`

`npm run update-modules`

`npm run dev`

By default the site will be at `http://localhost:1233/`

### With a local WVU-POC-common

You can also use a local version of [WVU-POC-common](https://github.com/Enterprise-Success/WVU-POC-common) to test changes within the common library locally before commiting them to the repository.

To do this:

- Open the `config/development/config.yml file`

- Uncomment the line `# - 'github.com/Enterprise-Success/WVU-POC-common -> ../../WVU-POC-common/'` (Avoid committing this change.)
Local development with the common theme assumes it is located in the same folder as WVU-POC.

### Component Organization

Our component library is structured into three key directories, each serving a specific purpose to maintain organization and clarity within our project. When adding new components, please adhere to this structure by placing your component files in the appropriate directory:

`Generic`: For single-item components such as links, headings, etc. These components are the building blocks of the application, designed for broad utility.

`Simple`: For small components that are composed of multiple elements, such as cards. These components are typically reusable and versatile across different parts of the application.

`Sections`: For components that serve as top-level section items, such as hero blocks. Sections are larger than Simple and Generic components and often serve as containers or structural elements of a page.


#### Adding New Components

To add a new component to our library, run `npm run init-component test-component` within the repo from the terminal.

This creates three files:

1. component-name.bookshop.yml - this is where any inputs, input configuration or preview configuration for the component goes.

2. component-name.hugo.html - this is where the HTML and any hugo templating for the component goes.

3. component-name.scss - this can be deleted as styles are done with bootstrap


## CloudCannon development

CloudCannon uses [site mounting](https://cloudcannon.com/documentation/articles/site-mounting/) to access [WVU-POC-common](https://github.com/Enterprise-Success/WVU-POC-common) module. This approach is offered by CloudCannon and allows a faster build than if hugo modules were used. 

[Site mounting](https://cloudcannon.com/documentation/articles/site-mounting/) also means that when the associated site on the [CloudCannon WVU-POC-common](https://app.cloudcannon.com/46861/editor#projects/7384/sites) (by default main) is updated, it will automatically trigger a rebuild within your [WVU-POC sites in CloudCannon](https://app.cloudcannon.com/46861/editor#projects/7346/sites).

You may want to change the branch used for [site mounting](https://cloudcannon.com/documentation/articles/site-mounting/) to make changes in the [common site](https://app.cloudcannon.com/46861/editor#projects/7384/sites) and test them on [this site](https://app.cloudcannon.com/46861/editor#projects/7346/sites) exclusively on one branch before merging that to main. To do this:

- Create a new site for the changes in [WVU-POC-common](https://app.cloudcannon.com/46861/editor#projects/7384/sites). Note down the cloudvent link for this site.
![Create a new site](/assets/readme-images/new-common-site.webp)
![Copy the cloudvent link, found within the dashboard](/assets/readme-images/cloudvent-url.webp)

- If you haven't already, create a new site to test the changes within [WVU-POC](https://app.cloudcannon.com/46861/editor#projects/7346/sites)
![Create a new site](/assets/readme-images/new-main-site.webp)

- Navigate to site settings -> site mountings
![Navigate to the site mountings tab within site settings](/assets/readme-images/site-mountings.webp)

- Unmount the currently mounted site 
![Unmount the current site](/assets/readme-images/site-mountings-unmount.webp)

- Add the remote site you created using the cloudvent link you located in step 1
![Add the common site copied earlier](/assets/readme-images/select-site-mount.webp)

- Add `themes/common` to the local path field and select `mount site`
![Mount the site to themes/common](/assets/readme-images/mount-site.webp)

- Start making changes in both sites and see the updates!

### Live editing

Some parts of the site use site data to populate the information within the component - this uses some complex logic that slows down the live editing of those pages.

To avoid this, these components (any of the 'collection' components) contain a field `hide collection pages`. If you select this, it will hide that component during the visual editing so that you can make your edits faster. 


## Build Process

Within the prebuild script and the `./assets/javascript/collections.js` is called. This file takes site data (that would otherwise not be available when live editing) and adds it to data files so it can be live edited within CloudCannon.

It is also called locally within the `npm run dev` command so that the preview is consistant rather than creating inconsistencies by using the generated collection data in live editing and otherwise using the site data.
