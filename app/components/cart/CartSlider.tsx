"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import CartItem from "./CartItems";
import { clearCart } from "../../redux/slices/cartSlice";
import Link from "next/link";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSlider({ open, onClose }: CartSidebarProps) {
  const items = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          p: 3,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" component="h3">
          Your Cart
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Cart Items */}
      <Box flex={1} mt={2} mb={2} sx={{ overflowY: "auto", maxHeight: "60vh" }}>
        {items.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={5}>
            Your cart is empty
          </Typography>
        ) : (
          items.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </Box>

      <Divider />

      {/* Total & Actions */}
      <Stack spacing={2} mt={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight="bold">
            Total:
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ${Number(total).toFixed(2)}
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Link href="/checkout" passHref legacyBehavior>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={onClose}
            >
              Checkout
            </Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => dispatch(clearCart())}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
