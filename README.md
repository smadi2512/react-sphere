# <img src="./frontend/src/assets/logo.png" alt="ReactSphere logo" width="50" align="center"/> React Sphere

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-6.30.1-CA4245?logo=react-router)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.5-FF4154?logo=react-query)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.15-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)


**ReactSphere** is a modern web application built to explore and manage developers' events and meetups. It provides a smooth experience for **browsing, searching, creating, and managing events**, powered by **React Router**, **TanStack Query**, and **Tailwind CSS** for a fast & modern UI.

ReactSphere currently focuses on **Events for React developers**, and I'm mainly working to extend it into a full developer platform with **Courses, Blog, and Community features**. I developed a **modular, scalable architecture** that can be easily extended with authentication, pagination, and other ecosystem features.

---

## 🚀 Features

### Frontend
#### **🎯Core Functionality**
- **Event Management** – Create, edit, delete, and browse events with full CRUD operations.
- **Dynamic Routing** – Implemented using **React Router** with loaders & actions.
- **Advanced Search** – Real-time filtering for events by title, location & description
- **Interactive Image Picker** with preview before submission.
- **Fully responsive UI** using **TailwindCSS**.

#### **⚡Performance & UX**
- **Real-time Data Sync** – Smart caching, background refetch, and data synchronization with **TanStack Query**.
- **Optimistic UI updates** – Instant feedback with automatic rollback on failure.
- **Global Loading Indicator** – Unified loading state using `useIsFetching` and `<LoadingIndicator />`
- **Error handling** via error boundaries and fallback components.

<br>

### Backend
- **Node.js + Express** – Prebuilt REST API for event management.
- **JSON File Storage** – Lightweight, and easy to replace with a real database.
- **Full CRUD Endpoints** – Retrieve, create, update, and delete events.
- **Extensible Architecture** – Ready for database or cloud deployment

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **React 19.2.0**
  - Hooks: `useState`, `useRef`, `useEffect`
  - **Portals**, **forwardRef**, and **useImperativeHandle** for modal rendering
- **React Router v6+**
  - `createBrowserRouter` + RouterProvider with Route Objects.
  - Nested routes & Layouts with `<Outlet />`
  - Index route (only one per parent)
  - Navigation: `<Link>`, `<NavLink>`, `useNavigate`, `redirect`
  - Dynamic routes (:id) + `useParams`
  - `useNavigation` for pending UI
- **TanStack Query v5**
  - Server state management with caching & synchronization
  - `useQuery` for reading/fetching server data and handles caching, synchronization, refetching, retries, and states automatically
  - `useMutation` for performing create/update/delete operations against the server
  - `useIsFetching` for global loading indicator
  - **Core Cache Manipulation methods** like: `getQueryData()`, `cancelQueries()`, `setQueryData()`, `invalidateQueries()` and `fetchQuery()` used in Optimistic UI Updates
- **FormData** API for form submissions
- **JavaScript (ES6+)**
- **TailwindCSS** for styling and responsive design
- **Vite** for development and build

<br>


### 🏗️ Architecture

- **Feature-based architecture** for scalability and maintainability.
- **Separation of Concerns** – Clear boundaries between UI, state, and data layers
- **Component Reusability** – Shared UI components like: `<ErrorBlock />`, `<LoadingIndicator />` ... , and shared layout `<RootLaout />`, `<Header />`, and `<Footer />`

<br>

### ⚡Advanced Features & Patterns

#### 1. Controlled & Uncontrolled Modal Pattern

ReactSphere’s `Modal` component implements **both controlled and uncontrolled behaviors**, supports **controlled mode** via the `open` prop and **uncontrolled mode** via ref methods: `open()`, `close()`, and can be used flexibly depending on how the parent component manages state

**Controlled Mode**: In this mode, the parent explicitly manages the modal’s open/close state:
  ```jsx
  <Modal open={isModalOpen}>
    <Form />
  </Modal>
  ```
  Internally, the `useEffect` hook listens to changes in the `open` prop and updates the native `<dialog>` accordingly.

**Uncontrolled Mode**: In this mode, the parent accesses modal control methods through a ref:
  ```jsx
  const modalRef = useRef();

  <Modal ref={modalRef}>...</Modal>

  // Somewhere else
  modalRef.current.open();   // opens programmatically
  modalRef.current.close();  // closes programmatically
  ```
  This is enabled via `useImperativeHandle`, exposing the `open()` and `close()` methods for flexible usage.

<br>

#### 2. Optimistic UI Updates (Edit Event Page)

ReactSphere also implements **optimistic updates** with Tanstack Query — a powerful UX enhancement that immediately reflects user actions while the server request is still pending.

  **🧠 How It Works?**

  When editing an event, the app:
  1. Instantly updates the local cache to reflect the edited event (`onMutate`)
  2. Cancels any outgoing queries for that event (`cancelQueries`)
  3. Rolls back to the previous state if the update fails (`onError`)
  4. Revalidates after success to ensure consistency (`invalidateQueries`)

  ```jsx
    const { mutate } = useMutation({
      mutationFn: updateEvent,
      onMutate: async (data) => {
        const newData = data.event;
        await queryClient.cancelQueries({ queryKey: ["events", eventId] });
        const previousEvent = queryClient.getQueryData(["events", eventId]);
        queryClient.setQueryData(["events", eventId], newData);

        return { previousEvent };
      },
      onError: (error, data, context) => {
        queryClient.setQueryData(["events", eventId], context.previousEvent);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["events", eventId]);
      },
    });

  ```
  🪄 **Result**: Immediate UI updates → rollback on failure → auto-refresh on success.

<br>

#### 🔍 3. Smart Event Search (Dynamic Query with React Query)

ReactSphere includes a **real-time search feature** that allows users to find events dynamically based on title, location, or description.

  **⚙️ Implementation Details:**
  - Uses **React Query’s dynamic keys** (`["events", { search: searchTerm }]`) to re-fetch automatically when the search term changes.
  - Enables conditional fetching with the `enabled` option — only queries when a term is entered.
  - Supports optional query parameters (`search`, `max`) to limit results or refine filtering from the backend.
  - Integrates **AbortController** automatically (through React Query’s `signal` argument) for request cancellation when typing new queries.
  - Clean UX states: loading spinner, error fallback, empty state, and result grid.

  ```jsx
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== "",
  });

  ```
<br>

### 🛠️ Backend

- Node.js
- Express.js for creating REST API endpoints
- JSON files for data storage (events.json and images.json)

---

## 📂 Project Structure

### Frontend Structure

```text
react-sphere/frontend/
├── App.jsx                        # Root app component (sets up routes and layout)
├── index.css                      # Global styles & Tailwind base imports
├── main.jsx                       # App entry point (renders <App />)
├── queryClient.js                 # React Query client configuration
├── router.jsx                     # Main router setup (defines route hierarchy)

├── assets/                        # Static assets (logos, images)
│   ├── logo.png
│   └── meetup.jpg

├── features/                      # Domain-based feature modules
│   └── events/                    # Events feature
│       ├── api/                   # API and data fetching logic
│       │   └── http.js
│       ├── components/            # UI and functional components for events
│       │   ├── EventForm.jsx
│       │   ├── EventItem.jsx
│       │   ├── EventsIntroSection.jsx
│       │   ├── FindEventSection.jsx
│       │   └── NewEventsSection.jsx
│       ├── pages/                 # Page components (used in routing)
│       │   ├── EditEventPage.jsx
│       │   ├── EventDetailsPage.jsx
│       │   ├── EventsPage.jsx
│       │   └── NewEventPage.jsx
│       └── router/                # Route-level logic (loaders, actions, routes)
│           ├── eventsActions.js
│           ├── eventsLoaders.js
│           └── eventsRoutes.jsx

├── shared/                        # Reusable shared modules
│   ├── components/                # Shared UI elements
│   │   └── ui/
│   │       ├── ErrorBlock.jsx
│   │       ├── ImagePicker.jsx
│   │       ├── LoadingIndicator.jsx
│   │       └── Modal.jsx
│   └── layouts/                   # Layout components (header, footer, root)
│       ├── Footer.jsx
│       ├── Header.jsx
│       └── RootLayout.jsx
└─
```

---

## ⚙️ Installation & Usage

### Running Frontend

Clone the repository, install frontend dependencies, and start the frontend server

```bash
git clone git@github.com:smadi2512/react-sphere.git
cd react-sphere
cd frontend
npm install
npm run dev
```

**Note**: The frontend will run on http://localhost:5173

<br>

### Running Backend

In a new terminal, navigate to the backend directory, install its dependencies, and start the backend server:

```bash
cd backend
npm install
npm start
```

**Note**: The backend will run on http://localhost:3000

---

## 📸 Screenshots

<table align="center">
  <tr>
    <td>
      <h4 align="center">ReactSphere Home page</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-home.png" alt="Home page" width="300" />
    </td>
    <td>
      <h4 align="center">ReactSphere Search section</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-searchsection.png" alt="Search section" width="300"/>
    </td>
    <td>
      <h4 align="center">ReactSphere New Event page</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-newEvent.png" alt="Create new event" width="300" />
    </td>
  </tr>
  <tr>
    <td>
      <h4 align="center">ReactSphere with Event's details page</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-EventDetails.png" alt="Event details" width="300" />
    </td>
    <td>
      <h4 align="center">ReactSphere with Event's edit feature</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-editEvent.png" alt="Event's edit feature" width="300" />
    </td>
    <td>
      <h4 align="center">ReactSphere with Event's delete feature</h4>
      <img src="./frontend/src/assets/screenshots/ReactSphere-deleteEvent.png" alt="Event's delete feature" width="300"/>
    </td>
  </tr>
</table>

---

## 🧩 Future Improvements

Planned enhancements and upcoming features to make ReactSphere more powerful, dynamic, and user-friendly 🔮

### 🟢 High Priority
- **File Upload System** – Dynamic image upload with drag-and-drop and preview.
- **Authentication System** – User registration/login with role-based access (Admin, Organizer, Attendee)
- **Event Categories** – Organize events by type (Workshops, Meetups, Conferences).
- **Comments System** – User reviews and discussions on events.

### 🟡 Medium Priority
- **Pagination & Filtering** – Improved event discovery and navigation.
- **Calendar Integration** – Visual event scheduling and interactive calendar.
- **Database Migration** – Replace JSON with PostgreSQL/MongoDB.
- **Debounced Search** – Smoother search with reduced API calls.

### 🔵 Enhancement Features
- **Dark Mode** – Theme switching capability for better UX.
- **TypeScript Migration** – Full type safety across frontend part.
- **Email Notifications** – Event reminders and updates.
- **Real-time Features** – WebSocket integration for live updates.

### 🟣 Community Expansion
- **User Profiles** – Developer portfolios and social features.
- **Learning Resources** – Courses, tutorials, and educational content.
- **Discussion Forums** – Community engagement and collaboration.
- **Job Board** – Career opportunities for developers.

---

## 👩‍💻 Author

Created by **Walaa Smadi**✨ \
Passionate React developer building modern, maintainable, scalable, performant, and user-friendly web apps.

- Email: [walasmadi93@gmail.com](mailto:walasmadi93@gmail.com)
- LinkedIn: [Walaa Smadi](https://www.linkedin.com/in/walaa-bilal-smadi/)
- GitHub: [@smadi2512](https://github.com/smadi2512)

Feel free to fork, star ⭐, and contribute!