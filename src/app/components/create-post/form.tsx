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
import { useSession } from "next-auth/react"

import { doc, getFirestore, setDoc } from "firebase/firestore"
import {
  getDownloadURL, getStorage,
  ref, uploadBytes
} from "firebase/storage"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from 'sonner'
import app from "./../../../config/FirebaseConfig"
 
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  desc: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  price: z.string().min(1, {
    message: "El precio debe tener al menos 1 caracter.",
  }),
  image: z.string().min(1, {
    message: "La imagen es obligatoria.",
  }),
  tel: z.string().min(10, {
    message: "El teléfono debe tener 10 digitos.",
  }).refine(value => value.length <= 10, {
    message: "El telefono no puede tener mas de 10 digitos.",
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      price: "",
      image: "",
      tel: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
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
    } else {
      router.push('/');
      return;
    }

    // Asegúrate de que el usuario que está intentando publicar es el mismo que el usuario de la sesión
    if (session.user.email !== data.useremail) {
      // Los emails no coinciden, muestra un mensaje de error o redirige al usuario a una página de error
      toast.error('No tienes permiso para realizar esta acción.');
      return;
    }

    const priceNumber = parseFloat(data.price);
    const file = (document.getElementById('image') as HTMLInputElement).files?.[0];

    data.price = priceNumber.toString();
    data.date = new Date(Date.now()).toISOString();
    //console.log(data);
    //alert(JSON.stringify(data, null, 2));
    data.title = data.title.trim().toUpperCase();
  
    try {
      const postId = Date.now().toString();

      const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));
      await setDoc(doc(db, "posts", postId), data);
    
      toast.promise(promise, {
        loading: 'Generando publicación...',
        success: () => {
          if (file) {
            const storageRef = ref(storage, `estlmarket/`+file?.name);
            uploadBytes(storageRef, file).then((snapshot) => {
              getDownloadURL(storageRef).then((url) => {
                data.image = url;
                setDoc(doc(db, "posts", postId), data).then(() => {
                  toast.promise(promise, {
                    loading: 'Cargando...',
                    success: 'Publicación visible en el feed.',
                    error: 'Error al subir la publicación.',
                  });
                  router.push('/');
                })
              })
            })
          }
          return '¡Publicación cargada éxitosamente! Redireccionando...';
        },
        error: 'Error al cargar publicación.',
      });
      //setTimeout(() => {
      //}, 3000);
      
      
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
            name="tel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Teléfono de contacto</FormLabel>
                <FormControl>
                  <Input type="text" maxLength={10} placeholder="Tu número de teléfono" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el numero de teléfono con el que podrán contactarte.
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
            <Button type="submit" disabled={isSubmitting}>Generar publicación</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormPost