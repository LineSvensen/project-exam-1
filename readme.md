# Project exam: Blog

### Welcome to this repo where it holds the code for the blog LS DEV (Line Svensen Developer) where the client/owner are able to log in, register new user and create/edit/delete blog posts. This project is a part of my Front-end development education at Noroff School of Technology and Digital Media. 

### Click here to view the blog: https://project-exam-1.vercel.app/

In this project, we were assigned to create a blog for a client (company) where the owner (blog author) can create, edit and delete post - but also register new accounts. Users/visitors of the blog would be able to see homepage and full post, but not able to access admin pages (create, edit, delete, register). 

        Client/company: LS DEV ENK
        Owner/blog author: Line Svensen
        Sector: Front end developer blog
        Size: None employees, only Line Svensen
        Location: Worldwide
        Mission: Line wants to share her journey and skills as a junior Front-end developer student to attract future employer(s) and customers.

![view-1.png](assets%2Fview-1.png)

![view-4.png](assets%2Fview-4.png)

## Programs used 🛠️
- Webstorm (HTML, CSS)
- Sourcetree (push project to Github)
- Noroff API
- Vercel (deploy webpage)

## Project structure/directories 📂
### <ins>Root directory</ins>

Homepage:

    - index.html
    - script.js

About page:

    about-me.html

### <ins>Account</ins>

Login page:

    - login.html
    - login.js
    
Register page:

    - register.html
    - register.js

### <ins>Assets</ins>
    all images and logos

### <ins>CSS</ins>
About page styling:

    about-me.css
    
Admin page styling:

    admin.css
    
Root styling for design elements that are consistent across all pages:
    
    constants.css
    
Create page styling:

    create.css
    
Edit page styling:

    edit.css
    
Header and footer styling consistent across all pages:

    header-footer.css
    
Login and register pages styling:

    login-register.css
    
Post details page styling:

    post-details.css
    
Homepage/index page styling:

    styles.css

### <ins>Post:</ins> 
    - admin.html
    - create.html
    - create.js
    - edit.html
    - edit.js
    - post-details.html
    - post-details.js

## Features 🌟

The webpage consists of 8 pages in total:

- Homepage / index.html
- About page / about-me.html
- Single post details page / post-details.html
- Edit page / edit.html
- Create page / create.html
- Admin page / admin.html
- Login page / login.html
- Register page / register.html

The blog runs smooth on all devices over 360px. 

#### Homepage:
- Main blog banner with both animated background and h1
- Interactive carousel showing the 3 latest posts using API. Press buttons to show previous and next post. Dots under carousel are clickable and showing what post of the three that are showing. Clicking read full post button will take you to the full post (post-details.html)
- 12 latest posts displayed as thumbnails/cards with date, title and image using API. Pressing read full post button will show the full post (post-details.html)
- Load more posts button will show more than the already displayed 12 posts, in correct order (based on created date) using API
- Navigation bar is showing logo, link to about me page and link/icon to login page
- Loader that shows when page is loading

#### Single post-details page:
- Page will show post title, date, author, main text content and images. When clicking share button, the specific post url will be automatically copied (alert will show up)
- Navigation bar is showing logo, link to about me page and link/icon to login page.

#### Login page:
- Simple page with form required to enter your email and password to log in to the blog (using API and token)

#### Admin page:
- Page made for the blog administrator(s) to easily navigate between the options create post, edit post and register new account.

#### Create page: 
- Page to create a new post for the blog using the form. The form requests title, main content/text and image.
- An alert will pop up if post was not successfully posted 
- Top nav bar gives administration option to either log out/homepage or go back to admin menu

#### Edit page:
- Page for administrator to edit existing posts
- Choosing existing post to edit by selecting post in dropdown (API)
- Existing title, content/text and image will automatically fill in form after selected post to edit (API)
- After edit is done, an alert will show up confirming the success
- When clicking delete button, an alert will ask if you are sure if you want to delete. If yes, it will delete post

#### Register page:
- For administrators to register new account for the blog
- Requires name, email and password
- Alert will show if not successful 

### About page:
- About page for client/company. History and contact info

## How to install 🔧

If you want to contribute to this project or just view locally you will need to download for example Webstorm or VS code.

Clone the repository:
git clone https://github.com/linesvensen/project-exam-1.git
cd project-exam-1
Run index.html in your browser to view the blog

## Reflection note:

This project was both fun and challenging. I have learned a lot more about API and tokens. No doubt that token was the most challenging part. 

Starting off, I tried to vision the complete blog. What helped me a lot, is my past as a blogger on the platform blogg.no.

The design is reflecting the client's brand: creative, playful, tech and modern.   

Feel free to contact me if you have questions or are interested in my work 😃

BR, Line