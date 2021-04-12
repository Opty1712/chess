import { styled } from 'linaria/react';
import { memo } from 'react';

export const AppRoot = memo(({ children }) => (
  <Root>
    <style jsx global>
      {`
        html {
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        * {
          font-family: 'Roboto', Arial, sans-serif;
        }

        #__next {
          height: 100%;
        }
      `}
    </style>
    {children}
  </Root>
));

AppRoot.displayName = nameof(AppRoot);

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 1000px;
  min-width: 1000px;
`;
