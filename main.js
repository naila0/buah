import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgSS-chZUH5T47nhRNeK6jYDnGZK_TQSA",
  authDomain: "insan-cemerlang-d6eb1.firebaseapp.com",
  projectId: "insan-cemerlang-d6eb1",
  storageBucket: "insan-cemerlang-d6eb1.appspot.com",
  messagingSenderId: "162904381844",
  appId: "1:162904381844:web:dd88782fdcc494c9ac1781",
  measurementId: "G-1RSX6TCWZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen =await addDoc(collection(basisdata,"buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })
    
    //menampilkan pesan hasil 
    console.log("berhasil menyimpan data buah")
  } catch (error) {
    //menampilkan pesan gagal
    console.log("gagal menyimpan data buah")
  }
}

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })
  
  return hasilKueri;
}

export async function hapusbuah(id) {
  await deleteDoc(doc(basisdata, "buah", id))
}

export async function ubahBuah(id, namabaru, warnabaru, hargabaru) {
  await updateDoc(
    doc(basisdata, "buah", id),
    {nama: namabaru, warna: warnabaru, harga: hargabaru}
    )
}
export async function ambilBuah(id) {
  const refDokumen = await doc(basisdata, "buah", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}