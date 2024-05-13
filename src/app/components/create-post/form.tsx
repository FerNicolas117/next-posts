"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"

import { getFirestore } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, getStorage,
  ref, uploadBytes } from "firebase/storage";

import app from "./../../../config/FirebaseConfig"
import { useState } from "react"
 
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  desc: z.string().min(50, {
    message: "La descripción debe tener al menos 50 caracteres.",
  }),
  price: z.string().min(1, {
    message: "El precio debe tener al menos 1 caracter.",
  }),
  image: z.string().min(1, {
    message: "La imagen es obligatoria.",
  }),
})

function FormPost() {

  //const [file, setFile] = useState();

  const {data:session} = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      price: "",
      image: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (session?.user) {
      data.username = session.user.name;
      data.useremail = session.user.email;
      data.userimage = session.user.image;
    }

    const priceNumber = parseFloat(data.price);
    const file = (document.getElementById('image') as HTMLInputElement).files?.[0];

    data.price = priceNumber;
    data.date = new Date().toISOString();
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  
    try {
      const postId = Date.now().toString(); // Convierte a cadena correctamente
      await setDoc(doc(db, "posts", postId), data); // Usa postId como referencia del documento
      console.log("Documento guardado correctamente con ID:", postId);

      const storageRef = ref(storage, `estlmarket/`+file?.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(resp => {
        getDownloadURL(storageRef).then((url) => {
          console.log('File available at', url);
          data.image = url;
          setDoc(doc(db, "posts", postId), data);
        })
      })

    } catch (error) {
      console.error("Error al guardar el documento:", error);
      // Maneja el error según tus necesidades
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título de tu publicación" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el título de tu publicación, debe ser descriptivo y conciso.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe tu publicación"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Esta es la descripción de tu publicación, debe ser detallada y clara.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Precio de tu producto a publicar" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el precio de tu producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input id="image" accept="image/jpeg, image/png" type="file" {...field} />
                </FormControl>
                <FormDescription>
                  Esta es la imagen de tu producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Generar publicación</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormPost