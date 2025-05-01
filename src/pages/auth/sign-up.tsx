import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { registerRestaurant } from '@/api/register-restaurant.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';

const signUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string().min(11, 'Telefone inválido'),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      console.log(data);

      await registerRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });

      toast.success('Restaurante criado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (e) {
      console.log(e);
      toast.error('Algo deu errado');
    }
  }

  return (
    <div>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl leading-tight font-semibold tracking-tight">
              Criar uma conta
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e comece suas vendas
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                className="w-full"
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Nome do gerente</Label>
              <Input
                className="w-full"
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                className="w-full"
                id="phone"
                type="tel"
                {...register('phone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail </Label>
              <Input
                className="w-full"
                id="email"
                type="email"
                {...register('email')}
              />
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao se cadastrar, você concorda com nossos{' '}
              <Link to="/terms" className="underline">
                Termos de uso
              </Link>{' '}
              e{' '}
              <Link to="/privacy" className="underline">
                Política de privacidade
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
