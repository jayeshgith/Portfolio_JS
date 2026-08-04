# Portfolio_JS

This is a personal portfolio website built with vanilla HTML, CSS, and JavaScript. I implemented it as a static frontend project, so it can run directly in a browser without any build step or framework setup.

## How I Implemented It

The portfolio is structured in `index.html`. I created separate sections for the main portfolio flow:

- `Home` section with an introduction, profile image, call-to-action buttons, and social links.
- `About` section with personal summary, education, training, and experience timeline.
- `Skills` section using cards to group programming, frontend, backend, database, authentication, and tooling skills.
- `Projects` section showing featured projects with descriptions, tags, and links.
- `Certifications` section for achievements and completed courses.
- `Contact` section with contact details and a message form.

The visual design is handled in `style.css`. I used CSS variables for reusable colors, spacing, shadows, and gradients. The layout uses responsive grids, flexbox, section spacing, cards, hover states, and media queries for desktop, tablet, and mobile screens. The design also includes scroll reveal classes, gradient text, a styled navigation bar, responsive project cards, and mobile-friendly contact form styling.

The interactivity is implemented in `script.js` using plain JavaScript. It includes:

- Mobile navigation toggle with open and close states.
- Typing text animation in the hero section.
- Active navigation highlighting based on the section currently in view.
- Scroll reveal animation using `IntersectionObserver`.
- Contact form validation for name, email, and message fields.
- Contact form submission through FormSubmit using the Fetch API.

The project also uses external assets and libraries:

- Local images inside the `assets` folder.
- Google Fonts for typography.
- Font Awesome icons for social links, skills, buttons, and section icons.

## Project Files

```text
Portfolio_JS/
+-- assets/
|   +-- B.E Pic.jpeg
|   +-- Manish_.jpeg
|   +-- developer_avatar.png
+-- index.html
+-- script.js
+-- style.css
+-- README.md
```

## How To Run

Open `index.html` in any browser. No installation or command is required because the portfolio is built with plain HTML, CSS, and JavaScript.
