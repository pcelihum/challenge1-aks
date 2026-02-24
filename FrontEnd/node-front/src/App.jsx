import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Box,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const ENDPOINT = `/api/products`;

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("10");

  const [toast, setToast] = useState({ open: false, msg: "", severity: "error" });

  const count = useMemo(() => products.length, [products]);

  const showError = (msg) => setToast({ open: true, msg, severity: "error" });
  const showOk = (msg) => setToast({ open: true, msg, severity: "success" });

  async function loadProducts() {
    setLoading(true);
    try {
      const r = await fetch(ENDPOINT);
      if (!r.ok) throw new Error(`GET failed: ${r.status}`);
      const data = await r.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      showError(e?.message || "No se pudo cargar productos");
    } finally {
      setLoading(false);
    }
  }

  async function addProduct() {
    const payload = { name: name.trim(), price: Number(price) };

    if (!payload.name) return showError("El nombre es requerido.");
    if (Number.isNaN(payload.price)) return showError("Precio inválido.");

    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error(`POST failed: ${r.status}`);

      setOpen(false);
      setName("");
      setPrice("10");
      showOk("Producto agregado ✅");
      await loadProducts();
    } catch (e) {
      showError(e?.message || "No se pudo agregar producto");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 500px at 10% 10%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(800px 500px at 90% 20%, rgba(34,211,238,0.20), transparent 55%), radial-gradient(900px 600px at 50% 120%, rgba(16,185,129,0.10), transparent 65%)",
      }}
    >
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ background: "rgba(0,0,0,0.35)", borderBottom: "1px solid rgba(255,255,255,0.10)" }}
      >
        <Toolbar>
          <Inventory2Icon style={{ marginRight: 10 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 0.3 }}>
            Products UI
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Chip
            label={`${count} productos`}
            variant="outlined"
            sx={{ mr: 1, borderColor: "rgba(255,255,255,0.22)" }}
          />

          <Tooltip title="Refrescar">
            <span>
              <IconButton onClick={loadProducts} disabled={loading} color="inherit">
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{
              ml: 1,
              background: "linear-gradient(45deg, rgba(124,58,237,0.9), rgba(34,211,238,0.65))",
            }}
          >
            Nuevo
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4 }}>
        <Paper sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 950 }}>
                Lista de productos
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                Front mínimo para que el CI/CD no se aburra 😄
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {loading ? <CircularProgress size={22} /> : null}
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id || `${p.name}-${p.price}`} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{p.name}</TableCell>
                  <TableCell>${p.price}</TableCell>
                  <TableCell sx={{ opacity: 0.7 }}>
                    <code>{p._id || "-"}</code>
                  </TableCell>
                </TableRow>
              ))}

              {products.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ opacity: 0.7 }}>
                    No hay productos. Crea el primero con “Nuevo”.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, opacity: 0.65, fontSize: 13 }}>
            API: <code>{ENDPOINT}</code>
          </Box>
        </Paper>
      </Container>

      {/* Dialog crear */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>Nuevo producto</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <TextField
            label="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="text" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={addProduct}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2800}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}