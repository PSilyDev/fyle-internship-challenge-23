# GitHub User Explorer

The GitHub User Explorer is an web-based application specifically designed to provide insights into GitHub users and their repositories. Using this application, users can easily explore GitHub profiles by providing a GitHub username of the user and instantly accessing valuable information about the user's profile, including their profile image, name, bio, location, Twitter URL, and GitHub URL. Additionally, users can browse through the user's repositories, viewing details such as repository name, description, and the coding languages used in developing that particular application.

# Features

* User Profile Information: Retrieve and display essential user profile details, including profile image, name, bio, location, and social media links.
* Repository Listing: Display a list of repositories associated with the user, showcasing repository names, descriptions, and coding languages used.
* Pagination: Navigate through multiple pages of repository listings with convenient pagination controls.
* Caching: Optimize performance by caching previously fetched repository data, reducing the need for redundant API calls.
* Responsive Design: Ensure a seamless user experience across various devices with a responsive and user-friendly interface.

# Additional Features

* User Information Validation: Validating what all information is available, anddisplaying the user information based on available data.
* Coding Languages Styling: Provided different styling for different coding languages which makes the UI look more beautiful.
* Page Sizing: Included page sizing functionality to display repositories based on user's choice.

# Target Audience

The GitHub User Explorer application is ideal for developers, recruiters, and anyone interested in exploring GitHub user profiles and repositories. Whether you're researching potential collaborators, evaluating a developer's skillset, or simply curious about someone's GitHub activity, this application provides a convenient and intuitive way to access valuable GitHub data.

# Technologies Used

* Angular: Frontend framework for building dynamic web applications.
* GitHub API: Integration with the GitHub API to fetch user and repository data.
* Tailwind CSS: Utility-first CSS framework for quickly styling the application.
* Local Storage: Utilized for caching repository data to enhance performance.

# Unit Tests and Code Coverage
The GitHub User Explorer application includes comprehensive unit tests to ensure the reliability and functionality of its components and services. The project contains unit tests for all the components used in the project.

1. Running Unit Tests - To run the unit tests locally:
   * Install dependencies : "npm install"
   * Run tests : "ng test"

2. Viewing Code Coverage - After running the unit tests, you can view the code coverage report to assess the percentage of code covered by the tests. The code coverage report provides valuable insights into the effectiveness of the unit tests in verifying the application's functionality.

3. Components and Services Tested -
   * Components: The application includes unit tests for components -  'search-bar', 'user-info', 'repository-list'
   * Service: Unit tests are alos implemented 'ApiSercice' to ensure accurate data retrieval.

# Installation

1. Fork this repository to your github account.
2. Clone the forked repository and proceed with steps mentioned below.

# Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).
