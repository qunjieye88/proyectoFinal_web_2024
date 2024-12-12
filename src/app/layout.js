import "./_style/loginComponentStyle/pageLogin.css"

export const metadata = {
  title: "Login"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
