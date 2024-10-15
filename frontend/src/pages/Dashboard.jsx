import { useState, useEffect } from "react";
import { baseUrl } from "../base/base";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import MyCard from "../components/MyCard";

const Dashboard = () => {
  const initialCreateData = {
    name: "",
    description: "",
    linkedin: "",
    twitter: "",
    interests: "",
  };
  const token = localStorage.getItem("token");
  const [cardData, setCardData] = useState([]);

  // card dialog
  const [createOpen, setCreateOpen] = useState(false);
  // card create data
  const [createData, setCreateData] = useState(initialCreateData);
  //selected card id
  const [selectedId, setSelectedId] = useState("");
  // delete confirmation dialog open
  const [deleteOpen, setDeleteOpen] = useState(false);
  // edit dialog open
  const [editOpen, setEditOpen] = useState(false);
  // edit data
  const [editData, setEditData] = useState(initialCreateData);

  const fetchCardData = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/cards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (!response.ok) throw new Error("Cannot get card data");

      const data = await response.json();
      setCardData(data?.cards);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          name: createData.name,
          description: createData.description,
          linkedin: createData.linkedin,
          twitter: createData.twitter,
          interests: createData.interests,
        }),
      });

      if (!response.ok) throw new Error("cannot create card");

      await response.json();
      await fetchCardData();
      setCreateData(initialCreateData);
      setCreateOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/deleteCard`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ id: selectedId }),
      });

      if (!response.ok) throw new Error("cannot delete the card");

      await response.json();
      await fetchCardData();
      setSelectedId("");
      setDeleteOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = (id, card) => {
    setSelectedId(id);
    setEditData(card);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditConfirm = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/editCard`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        },
        body: JSON.stringify({
          id: selectedId,
          name: editData.name,
          description: editData.description,
          linkedin: editData.linkedin,
          twitter: editData.twitter,
          interests: editData.interests
        })
      })

      if (!response.ok) throw new Error("cannot update the card");

      await response.json();
      await fetchCardData();
      setEditData(initialCreateData);
      setSelectedId("");
      setEditOpen(false);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div>
      {/* Create Button */}
      <Box>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          sx={{ my: 1 }}
          onClick={() => setCreateOpen(true)}
        >
          Create
        </Button>
      </Box>

      {/* create card dialog */}
      <Dialog open={createOpen} onClose={() => setCreateOpen(false)}>
        <DialogContent>
          <DialogTitle>Create Card</DialogTitle>

          <Grid2 container spacing={2}>
            <Grid2 item size={12}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                onChange={handleCreateChange}
                value={createData.name}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                name="description"
                onChange={handleCreateChange}
                value={createData.description}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Interests"
                fullWidth
                name="interests"
                onChange={handleCreateChange}
                value={createData.interests}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="LinkedIn"
                fullWidth
                name="linkedin"
                onChange={handleCreateChange}
                value={createData.linkedin}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Twitter"
                fullWidth
                name="twitter"
                onChange={handleCreateChange}
                value={createData.twitter}
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={() => {
              setCreateData(initialCreateData);
              setCreateOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: 2, mb: 1 }}
            onClick={handleCreate}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit card dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogContent>
          <DialogTitle>Edit Card</DialogTitle>

          <Grid2 container spacing={2}>
            <Grid2 item size={12}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                onChange={handleEditChange}
                value={editData.name}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                name="description"
                onChange={handleEditChange}
                value={editData.description}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Interests"
                fullWidth
                name="interests"
                onChange={handleEditChange}
                value={editData.interests}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="LinkedIn"
                fullWidth
                name="linkedin"
                onChange={handleEditChange}
                value={editData.linkedin}
              />
            </Grid2>

            <Grid2 item size={12}>
              <TextField
                label="Twitter"
                fullWidth
                name="twitter"
                onChange={handleEditChange}
                value={editData.twitter}
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={() => {
              setEditData(initialCreateData);
              setSelectedId("");
              setEditOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: 2, mb: 1 }}
            onClick={handleEditConfirm}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* card delete confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this card?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={() => {
              setSelectedId("");
              setDeleteOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: 2, mb: 1 }}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* All Cards */}
      <Grid2 container spacing={2}>
        {/* cards */}
        {cardData.map((card) => (
          <MyCard
            card={card}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            key={card?._id}
          />
        ))}
      </Grid2>
    </div>
  );
};

export default Dashboard;
