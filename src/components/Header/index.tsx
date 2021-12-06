import { SignInButton } from '../SignInButton';
import { HeaderContainer } from './styles';
import { ActiveLink } from '../ActiveLink';

export function Header(){
    return(
        <HeaderContainer>
            <div className="header-content">
                <img src="/images/logo.svg" alt="Logo do Ig News" />
                <nav>
                    <ActiveLink href='/' activeClassName="active">
                        <a>Início</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" activeClassName="active" prefetch>
                        {/* Prefetch ja deixa a página carregada */}
                        <a>Notícias</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </HeaderContainer>
    );
}
