import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { playersCollection } from "../../../firebase";
import AdminLayout from "../../HOC/AdminLayout";
import { showErrorToast } from "../../Utils/tools";
import { Link } from "react-router-dom";

const AdminPlayers = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);

  useState(() => {
    if (!players) {
      setLoading(true);
      playersCollection
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers(players);
        })
        .catch((error) => showErrorToast(error))
        .finally(() => setLoading(false));
    }
  }, [players]);

  const loadMorePlayers = () => {
    if (!lastVisible) return;

    setLoading(true);
    playersCollection
      .startAfter(lastVisible)
      .limit(2)
      .get()
      .then((snapshot) => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const newPlayers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLastVisible(lastVisible);
        setPlayers([...players, ...newPlayers]);
      })
      .catch((error) => showErrorToast(error))
      .finally(() => setLoading(false));
  };

  return (
    <AdminLayout title="The Players">
      <div className="mb-5">
        <Button
          variant="outlined"
          disableElevation
          component={Link}
          to="/admin_player/add_player"
        >
          Add Player
        </Button>
      </div>

      <Table className="mb-5">
        <TableHead>
          <TableCell>First name</TableCell>
          <TableCell>Last name</TableCell>
          <TableCell>Number</TableCell>
          <TableCell>Position</TableCell>
        </TableHead>
        <TableBody>
          {players
            ? players.map((player) => (
                <TableRow
                  key={player.id}
                  component={Link}
                  to={`/admin_player/edit_player/${player.id}`}
                >
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.lastname}</TableCell>
                  <TableCell>{player.number}</TableCell>
                  <TableCell>{player.position}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>

      <Button variant="contained" disabled={loading} onClick={loadMorePlayers}>
        Load more
      </Button>
    </AdminLayout>
  );
};

export default AdminPlayers;
