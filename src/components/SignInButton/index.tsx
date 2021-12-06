import { SignInBtn } from './styles';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

export function SignInButton() {
    const [ session ] = useSession();

    console.log(session);

    return session ? (
        <SignInBtn 
            type="button"
            onClick={() => signOut()}
        >
            <FaGithub color="#04b361"/>
            Lucas Annunziato
            <FiX color="#737380" className="closeIcon"/>
        </SignInBtn>
    ) :
    (
        <SignInBtn 
            type="button"
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Entrar usando GitHub
        </SignInBtn>
    )
}