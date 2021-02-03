# Welcome to Sea Track, My Front-End Capstone for Nashville Software School

Visit the live site [here](https://asgertler.github.io/sea-track/#/).

![Sea Track Card](https://asgertler.github.io/static/media/seaTrackCard.e1228e7c.png)

## Technologies Used

- Dbdiagram
- CSS3
- Heroku
- HTML5
- Illustrator
- Javascript
- JSON Server
- React
- Semantic UI
- VSCode

## Client

Aquarists & Aquarium Hobbyists

## Product

Water quality logging and tracking app

## Role

Lead UI/UX Designer & Front-End Developer

## Challenge

How might we make it easier and more efficient to log and track the health and quality of aquariums accurately over time?

## Process

This project began with identifying who our target audience is and what their needs and pain poitns are. I started by writing down three primary types of users:  

- **Experienced Hobbyist** *(User, Customer, Influencer)*
    - Probably older, 30s-50s
    - Fairly tech savvy
    - Early adopter/majority
    - Decent income
    - Keeps good logs
    - Wants easier tracking
    - Less clutter
    - Tired of spreadsheets
- **Beginner/New to Hobby** *(User)*
    - Any age, probably younger
    - May be less tech inclined
    - Late majority
    - Wide income range, probably lower
    - Unfamiliar with logging
    - Not ready for complicated
    - One-stop-shop
- **Proffessional** *(User, Customer, Influencer)*
    - Probably older, 40s+
    - Very tech savvy
    - Early adopter/innovator
    - Solid budgets, within reason
    - Keeps extensive logs
    - Needs to track large systems
    - Record-keeping vital
    - Lots of users

From there, I translated those initial ideas into more fleshed-out personas:

![New Aquarist](https://asgertler.github.io/static/media/hazel-floyd.c4e83e22.png)

![Experienced Aquarist](https://asgertler.github.io/static/media/levi-walton.d5c24a8a.png)

![Proffessional Aquarist](https://asgertler.github.io/static/media/sulema-barba.a09188fc.png)

Using the information gained from creating these personas and receiving feedback from teammates about them, I turned my focus to my ERD that would be the fundamental basis for this entire project in order to effectively achieve CRUD:

![ERD](https://asgertler.github.io/static/media/sea-track-erd.61e1212a.png)

Next was to create an initial wireframe to give myself direction once I began actually developing the application:

![Wireframe](https://asgertler.github.io/static/media/sea-track-wireframe.bd96a0fb.png)

With all of that information in hand, I set out to create Sea Track using React. The initial build phase in order to meet MVP for my NSS front-end capstone took about two weeks. In the end, I successfully built (and eventually deployed) a working application that allows users to create accounts (unsecure, for learning purposes), create aquariums, add fish to aquariums, create tasks, and log water quality. All of those elements successfully met MVP via CRUD. I also implemented a series of warnings set up to track certain water conditions against safe ranges the user puts onto their fish, such as a healthy pH range. It can also warn the user if they are overdue for a water change.

![Site Screenshot](https://asgertler.github.io/static/media/sea-track-site.29a17702.png)

After completing my capstone project, I went ahead and deployed the React side of the app on GitHub Pages and hosted the database on Heroku so that the site could be live tested/demoed as well as giving me a chance to learn about fully deploying an application.

## Success

- Completed my front-end capstone project for Nashville Software School by creating an app in React and hitting CRUD.
- Learned how useful a solid planned ERD is for efficiently creating usable database structures.
- Fully deployed my app for testing and demoing purposes by utilizing GitHub Pages and Heroku.