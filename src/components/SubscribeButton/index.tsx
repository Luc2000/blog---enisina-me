import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { SubscribeButtonContainer } from './styles';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    const router = useRouter();

    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return;
        }
        
        if(session.activeSubscription){
            router.push('/posts');
            return;
        }

        // Checkout session
        try {
            const response = await api.post('/subscribe');
            const { sessionId } = response.data;

            console.log(response);
            console.log({sessionId});

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    return(
        <SubscribeButtonContainer type="button" onClick={handleSubscribe}>
            Inscreva-se já
        </SubscribeButtonContainer>
    );
}