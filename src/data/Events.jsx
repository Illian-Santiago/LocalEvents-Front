import gato from "../assets/gato.jpg";

export const events = [
    {
        id: 1,
        title: "Conferencia de Tecnología",
        image: gato,
        description: "Un evento sobre las últimas innovaciones en tecnología.",
        state: "Proximamente",
        type: "Evento",
        num_guests: 120,
        max_guests: 200,
        start_hour: "10:00",
        end_hour: "18:00",
        start_date: "2025-03-15",
        end_date: "2025-03-15",
        num_collaborators: 10,  
        max_collaborators: 20,
        association_id: 1
    },
    {
        id: 2,
        title: "Taller de Diseño UX",
        image: gato,
        description: "Aprende sobre diseño de experiencia de usuario con expertos.",
        state: "Realizandose",
        type: "Actividad",
        num_guests: 50,
        max_guests: 100,
        start_hour: "14:00",
        end_hour: "17:00",
        start_date: "2025-02-20",
        end_date: "2025-02-20",
        num_collaborators: 5,
        max_collaborators: 10,
        association_id: 2
    },
    {
        id: 3,
        title: "Hackathon 2025",
        image: gato,
        description: "Compite en este hackathon y crea proyectos innovadores.",
        state: "Finalizado",
        type: "Evento",
        num_guests: 300,
        max_guests: 500,
        start_hour: "08:00",
        end_hour: "20:00",
        start_date: "2025-01-10",
        end_date: "2025-01-12",
        num_collaborators: 20,
        max_collaborators: 30,
        association_id: 3
    }
];
