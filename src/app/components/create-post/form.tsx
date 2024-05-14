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
import { useRouter } from "next/navigation"
import { toast } from 'sonner'
import { error } from "console"
 
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
  username: z.string().optional(),
  useremail: z.string().optional(),
  userimage: z.string().optional(),
  date: z.string().optional(),
})

function FormPost() {

  //const [file, setFile] = useState();

  const {data:session} = useSession();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const router = useRouter();

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
      if (session.user.name) {
        data.username = session.user.name;
      }
      if (session.user.email) {
        data.useremail = session.user.email;
      }
      if (session.user.image) {
        data.userimage = session.user.image;
      }
    }

    const priceNumber = parseFloat(data.price);
    const file = (document.getElementById('image') as HTMLInputElement).files?.[0];

    data.price = priceNumber.toString();
    data.date = new Date(Date.now()).toISOString();
    //console.log(data);
    //alert(JSON.stringify(data, null, 2));
  
    try {
      const postId = Date.now().toString();

      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 3000));
      await setDoc(doc(db, "posts", postId), data);
    
      toast.promise(promise, {
        loading: 'Creando publicación...',
        success: () => {
          if (file) {
            const storageRef = ref(storage, `estlmarket/`+file?.name);
            uploadBytes(storageRef, file).then((snapshot) => {
            }).then(resp => {
              getDownloadURL(storageRef).then((url) => {
                data.image = url;
                setDoc(doc(db, "posts", postId), data);
              })
              setTimeout(() => {
                router.push('/');
              }, 3000);
              //toast.success('¡Publicación creada correctamente! Redireccionando...')
            })
            return '¡Publicación creada correctamente! Redireccionando...';
          }
        },
        error: 'Error, no se ha creado la publicación. Redireccionando...',
      })
      
      
    } catch (error) {
      toast.error('Error, no se ha creado la publicación. Redireccionando...')
      setTimeout(() => {
        router.push('/');
      }, 3000);
      //console.error("Error al guardar el documento:", error);
      // Maneja el error según tus necesidades
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <FormControl className="cursor-pointer">
                  <Input id="image" accept="image/jpeg, image/png" type="file" className="cursor-pointer" {...field} />
                </FormControl>
                <FormDescription>
                  Esta es la imagen de tu producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit">Generar publicación</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormPost