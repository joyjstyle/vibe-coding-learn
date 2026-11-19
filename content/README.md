# VibeCode Academy: Clinic Genie Vibe Coding Intern Platform

Locked lesson content for the platform.

Status: Approved and locked by the curriculum owner on 13 November 2026, with Lesson 3.3 approved and locked on 15 November 2026. Lesson 1.2 was revised for a VS Code workspace and approved and locked on 15 November 2026. Lessons 1.3, 1.4 and 9.4 were revised the same day to match the VS Code workflow and await approval; the other 37 lessons are locked.

This package holds the intern-facing lesson content for VibeCode Academy, the Clinic Genie Vibe Coding Intern Platform. Interns build a website for Saffron Wellness Clinic, a fictional practice client. Language is UK English. All code examples use TypeScript and TSX.

## What is in the package

| File | Purpose |
|---|---|
| `lessons/lesson-X.Y.md` | One Markdown file per lesson, ready to display to interns |
| `curriculum.json` | Units, days, lesson order, titles and file paths, for importing into the platform |
| `INTERN_CURRICULUM_ALL_LESSONS.md` | Every lesson in one file, in order, for reading or printing |

Curriculum-review notes (draft status lines, source and version notes, and review checkpoints) have been removed from the lesson files. The lesson content is otherwise unchanged from the approved text. The approval record and history stay in the project's `02_APPROVAL_AND_SOURCE_REGISTER.md` and `claude/CURRICULUM_CHANGE_LOG.md`.

## Programme structure

Ten days, one unit per day, four lessons per unit.

| Day | Unit | Lessons |
|---|---|---|
| 1 | Introduction and Tool Setup | 1.1 How Websites Work and the Vibe Coding Workflow; 1.2 Setting Up Claude Code CLI and the Terminal; 1.3 Understanding Project Files, TypeScript and TSX; 1.4 Run a Starter Website and Save a Git Checkpoint |
| 2 | Brief, Research and Website Structure | 2.1 Understanding the Business, Audience and Industry; 2.2 Researching Relevant References and Sources Efficiently; 2.3 Planning the Sitemap, User Journeys and Page Sections; 2.4 Submit the Website Brief and Structure for Review |
| 3 | Design and Markdown Instructions | 3.1 Following the Approved Design, Style Guide and Content; 3.2 Understanding the Project Markdown Files and Instruction Hierarchy; 3.3 Preparing the PRD, Architecture, Rules and Task Plan; 3.4 Review the Instructions Before Building |
| 4 | Directing Claude Code and Building Foundations | 4.1 Inspecting a Project and Writing Scoped Prompts; 4.2 Planning Small Tasks with Clear Acceptance Criteria; 4.3 Building Shared Styles, Navigation and Reusable Components; 4.4 Review the Build Against the Approved Design |
| 5 | Homepage and Responsive Design | 5.1 Building the Homepage Section by Section; 5.2 Adding and Checking Copy, Images and Calls to Action; 5.3 Refining the Homepage Across Screen Sizes; 5.4 Reviewing and Submitting the Homepage |
| 6 | Supporting Pages and Functionality | 6.1 Planning and Building Internal Pages; 6.2 Building Related Pages Without Duplicating Work; 6.3 Connecting Pages and Checking Visitor Journeys; 6.4 Reviewing and Submitting the Internal Pages |
| 7 | Forms and Interactive Features | 7.1 Defining Forms and Interactive Features; 7.2 Implementing and Testing Interactive Behaviour; 7.3 Debugging Interactive Features and Handling Failures; 7.4 Reviewing and Submitting Interactive Features |
| 8 | Testing and Debugging | 8.1 Planning and Running a Website QA Review; 8.2 Correcting QA Findings and Running Regression Checks; 8.3 Running a Focused Accessibility Review; 8.4 Automating Key Checks with Playwright |
| 9 | Security, Performance and Staging | 9.1 Handling Credentials, Personal Data and Dependencies Safely; 9.2 Improving Images, Loading Speed and Build Quality; 9.3 Checking Page Metadata, Headings and Search Readiness; 9.4 Reviewing Git Changes, Deploying to Staging and Verifying the Result |
| 10 | Independent Assessment and Handover | 10.1 Interpret a Change Brief and Update the Project Instructions; 10.2 Plan and Implement the Change Independently; 10.3 Test the Change and Submit Evidence; 10.4 Present the Website, Known Issues and Handover |

Unit titles are the original locked unit labels, except Unit 7. Its locked label, "Content, SEO and Accessibility", predates its approved lessons, so interns see "Forms and Interactive Features" instead (decided 15 November 2026). `curriculum.json` keeps the locked label as `locked_title`.

## Timing and unlocking

- Each day has 360 minutes of lessons. A suggested day runs 09:30 to 17:00, with a 60-minute lunch and two 15-minute breaks.
- Each lesson has an `estimated_minutes` value in `curriculum.json`, between 60 and 105 minutes. These are estimates based on lesson length, exercise steps and prompts, adjusted for setup-heavy lessons. Tune them after the first cohort.
- Day N opens on the cohort's Nth working day. All four lessons in a day open together, in a suggested order. Earlier days stay open for catching up.

## Outstanding items

- Lessons 1.3, 1.4 and 9.4 were revised on 15 November 2026 to match Lesson 1.2's VS Code workflow. The revised texts are included but await the curriculum owner's approval.
- Knowledge checks are to be multiple choice and marked automatically. The multiple-choice versions, with answer keys, still need writing.

## What the platform still needs from elsewhere

The lessons refer to materials that are not part of this package: the Saffron Wellness Clinic starter project, the approved brief, IA, designs, style guide, content and assets, and any integration or staging configuration. The blank working templates (task specification, QA findings, learner submission, content and dependency register) are in the project's `templates/` folder.
