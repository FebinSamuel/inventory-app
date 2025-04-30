import { db } from '../../../../services/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

const salesRef = collection(db, 'sales')

class DataService {
  addSale = (newSale) => {
    // Add 'created_at' and 'updated_at' timestamps
    const saleWithTimestamps = {
      ...newSale,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    }

    return addDoc(salesRef, saleWithTimestamps)
  }

  updateSale = (id, updateSale) => {
    const saleDoc = doc(db, 'sales', id)

    // Update 'updated_at' timestamp
    const policyWithTimestamp = {
      ...updateSale,
      updated_at: serverTimestamp(),
    }

    return updateDoc(saleDoc, policyWithTimestamp)
  }

  deletePolicy = (id) => {
    const policyDoc = doc(db, 'sales', id)
    return deleteDoc(policyDoc)
  }

  getAllPolicies = () => {
    return getDocs(salesRef)
  }

  getPolicy = (id) => {
    const saleDoc = doc(db, 'sales', id)
    return getDoc(saleDoc)
  }
  getProduct = (id) => {
    const productDoc = doc(db, 'products', id)
    return getDoc(productDoc)
  }
}

export default new DataService()
