'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {
  // Helper functions
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(true) // setting default value to false
  const [itemName, setItemName] = useState('') // setting default value to ''

  // Fetch inventory from firebase
  const updateInventory = async () => { // async caused the website to freeze while fetching
    const snapshot = query(collection(firestore, 'inventory')) //inventory in Firebase web
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    }) // for every element in docs, add to inventory list
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item) //gets direct item reference 
    const docSnap = await getDoc(docRef) //gets document reference if it exists

    if (docSnap.exists()) {
      if (quantity === 1) {
        await deleteDoc(docRef)
        await setDoc(docRef, {quantity: quantity + 1})
      }
      else {
        await setDoc(docRef, {quantity: 1})
      }
    }

    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item) //gets direct item reference 
    const docSnap = await getDoc(docRef) //gets document reference if it exists

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } 
      else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, []) // uses updateInventory whenever the array is updated. Runs once at the beginning when the page loads

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
  <Box 
  width = "100vw" 
  height = "100vh" 
  display = "flex" 
  justifyContent="center" 
  alignItems = "center"
  gap = {2}
  >
    <Modal open = {open} onClose={handleClose}>
      <Box 
        position="absolute" 
        top="50%" 
        left="50%" 
        width={400} 
        bgcolor={"white"} 
        border="2px solid #000" 
        boxShadow={24} 
        p={4} 
        display="flex" 
        flexDirection="column" 
        sx = {{transform: 'translate(-50%, -50%)'}}
        gap={3}>
          <Typography variant="h6">Add Item</Typography>
          <Stack width = "100%" direction="row" spacing={2}>
            <TextField 
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e)=> {
                setItemName(e.target.value)
              }}
            />
            <Button variant="outlined" onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}></Button>
          </Stack>
        </Box>
    </Modal>
    <Typography variant="h1">Inventory Management</Typography>
  </Box>
  )
}
