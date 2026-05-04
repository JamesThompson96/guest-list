import { useEffect, useState } from "react";
import { fetchGuests, fetchGuest } from "./Components/GuestLists";

export default function App() {
  const [guestId, setGuestId] = useState(null);

  return (
    <>
      <h1>Guests</h1>
      <GuestList setGuestId={setGuestId} />
      <GuestDetails guestId={guestId} />
    </>
  );
}

function GuestList({ setGuestId }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const syncGuests = async () => {
      const data = await fetchGuests();
      setGuests(data);
    };
    syncGuests();
  }, []);

  return (
    <>
      <h1>Guest List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id} onClick={() => setGuestId(guest.id)}>
              <td>{guest.name}</td>
              <td>{guest.email}</td>
              <td>{guest.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Select a guest to see more details.</p>
    </>
  );
}

function GuestDetails({ guestId }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const syncGuest = async () => {
      const data = await fetchGuest(guestId);
      setGuest(data);
    };
    syncGuest();
  }, [guestId]);

  if (!guest) return <p>Loading...</p>;

  return (
    <article className="guest-details">
      <h1>{guest.name}</h1>
      <address>
        {guest.email}
        <br />
        {guest.phone}
      </address>
      <p>{guest.job}</p>
      <p>{guest.bio}</p>
      <button onClick={() => setGuestId(null)}>Back</button>
    </article>
  );
}
