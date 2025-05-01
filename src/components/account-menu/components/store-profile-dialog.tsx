import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { getManagedRestaurant } from '@/api/get-managed-restaurant.ts';
import { updateProfile } from '@/api/update-profile.ts';
import { Button } from '@/components/ui/button.tsx';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileDialogSchema = z.infer<typeof storeProfileSchema>;

export function StoreProfileDialog() {
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileDialogSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name || '',
      description: managedRestaurant?.description || '',
    },
  });
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  async function handleUpdateProfile(data: StoreProfileDialogSchema) {
    try {
      await updateProfileFn({ name: data.name, description: data.description });
      toast.success('Perfil atualizado com sucesso');
    } catch (e) {
      console.log(e);
      toast.error('Algo deu errado');
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Configurações da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações da sua loja{' '}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input {...register('name')} id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              {...register('description')}
              id="description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>

          <Button disabled={isSubmitting} type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
