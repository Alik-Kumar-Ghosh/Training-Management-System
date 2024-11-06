// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './trainingDetails.css';

// const TrainingDetails = () => {
//   const { trainingId } = useParams();
//   const [trainingDetails, setTrainingDetails] = useState(null);

//   useEffect(() => {
//     const fetchTrainingDetails = async () => {
//       try {
//         const response = await axios.get(`/api/trainings/${trainingId}`);
//         setTrainingDetails(response.data);
//       } catch (error) {
//         console.error('Error fetching training details:', error);
//       }
//     };

//     fetchTrainingDetails();
//   }, [trainingId]);

//   if (!trainingDetails) return <p>Loading...</p>;

//   return (
//     <div className="training-details-page">
//       <h2>{trainingDetails.topic} - Details</h2>
//       <p><strong>Description:</strong> {trainingDetails.description}</p>
//       <p><strong>Location:</strong> {trainingDetails.location}</p>
//       <p><strong>Duration:</strong> {trainingDetails.startDate} to {trainingDetails.endDate}</p>
//       <p><strong>Trainer:</strong> {trainingDetails.trainerName}</p>
//       <p><strong>Participants:</strong></p>
//       <ul>
//         {trainingDetails.participants.map((participant) => (
//           <li key={participant.id}>{participant.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TrainingDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './trainingDetails.css';

// const TrainingDetails = () => {
//   const { trainingId } = useParams();
//   const [trainingDetails, setTrainingDetails] = useState(null);

//   useEffect(() => {
//     // Dummy data for a specific training detail
//     const dummyData = {
//       id: trainingId,
//       topic: "JavaScript Essentials",
//       description: "An in-depth course on JavaScript fundamentals and advanced concepts.",
//       location: "Room 101",
//       startDate: "2024-11-01",
//       endDate: "2024-11-10",
//       trainerName: "Alice Johnson",
//       participants: [
//         { id: 1, name: "John Doe" },
//         { id: 2, name: "Jane Smith" },
//         { id: 3, name: "Mark Taylor" },
//       ]
//     };

//     // Set dummy data instead of API response
//     setTrainingDetails(dummyData);
//   }, [trainingId]);

//   if (!trainingDetails) return <p>Loading...</p>;

//   return (
//     <div className="training-details-page">
//       <h2>{trainingDetails.topic} - Details</h2>
//       <p><strong>Description:</strong> {trainingDetails.description}</p>
//       <p><strong>Location:</strong> {trainingDetails.location}</p>
//       <p><strong>Duration:</strong> {trainingDetails.startDate} to {trainingDetails.endDate}</p>
//       <p><strong>Trainer:</strong> {trainingDetails.trainerName}</p>
//       <p><strong>Participants:</strong></p>
//       <ul>
//         {trainingDetails.participants.map((participant) => (
//           <li key={participant.id}>{participant.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TrainingDetails;

// ---  fetching userId, and type for showing participant only to admin and trainer---------


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './trainingDetails.css';

// const TrainingDetails = ({ userId, userType }) => {
//   const { trainingId } = useParams();
//   const [trainingDetails, setTrainingDetails] = useState(null);
//   const [participants, setParticipants] = useState([]);

//   useEffect(() => {
//     const fetchTrainingDetails = async () => {
//       try {
//         // Fetch general training details
//         const response = await axios.get(`/api/trainings/${trainingId}`);
//         setTrainingDetails(response.data);

//         // Fetch participants details if user is admin or trainer
//         if (userType === 'admin' || userType === 'trainer') {
//           const participantResponse = await axios.get(`/api/trainings/participants`, {
//             params: {
//               userId: userId,
//               trainingId: trainingId,
//             },
//           });
//           setParticipants(participantResponse.data);
//         }
//       } catch (error) {
//         console.error('Error fetching training details:', error);
//       }
//     };

//     fetchTrainingDetails();
//   }, [trainingId, userId, userType]);

//   if (!trainingDetails) return <p>Loading...</p>;

//   return (
//     <div className="training-details-page">
//       <h2>{trainingDetails.topic} - Details</h2>
//       <p><strong>Description:</strong> {trainingDetails.description}</p>
//       <p><strong>Location:</strong> {trainingDetails.location}</p>
//       <p><strong>Duration:</strong> {trainingDetails.startDate} to {trainingDetails.endDate}</p>
//       <p><strong>Trainer:</strong> {trainingDetails.trainerName}</p>
      
//       {/* Only show participants for admin and trainer roles */}
//       {userType === 'admin' || userType === 'trainer' ? (
//         <>
//           <h3>Participants</h3>
//           {participants.length > 0 ? (
//             <ul>
//               {participants.map((participant) => (
//                 <li key={participant.id}>{participant.name}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No participants found.</p>
//           )}
//         </>
//       ) : (
//         <p>You do not have permission to view the participants.</p>
//       )}
//     </div>
//   );
// };

// export default TrainingDetails;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../../contexts/userContext';
import './trainingDetails.css';

const TrainingDetails = () => {
    const { trainingId } = useParams();
    const { userId, userType } = useUser();  
    const [trainingDetails, setTrainingDetails] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchTrainingDetails = async () => {
            try {
                const response = await axios.get(`/training/${trainingId}`);
                setTrainingDetails(response.data);

                if (userType === 'admin' || userType === 'trainer') {
                    const participantResponse = await axios.get(`/training/participants`, {
                        params: {
                            trainingId,
                        },
                    });
                    setParticipants(participantResponse.data);
                }
            } catch (error) {
                console.error('Error fetching training details:', error);
            }
        };

        fetchTrainingDetails();
    }, [trainingId, userId, userType]);

    if (!trainingDetails) return <p>Loading...</p>;

    return (
        <div className="training-details-page">
            <h2>{trainingDetails.topic} - Details</h2>
            <p><strong>Description:</strong> {trainingDetails.description}</p>
            <p><strong>Location:</strong> {trainingDetails.location}</p>
            <p><strong>Duration:</strong> {trainingDetails.startDate} to {trainingDetails.endDate}</p>
            <p><strong>Trainer:</strong> {trainingDetails.trainerName}</p>

            {userType === 'admin' || userType === 'trainer' ? (
                <>
                    <h3>Participants</h3>
                    {participants.length > 0 ? (
                        <ul>
                            {participants.map((participant) => (
                                <li key={participant.id}>{participant.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No participants found.</p>
                    )}
                </>
            ) : (
                <p>You do not have permission to view the participants.</p>
            )}
        </div>
    );
};

export default TrainingDetails;




