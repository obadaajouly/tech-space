import StackNavigator from "./navigator/StackNavigator";
import { CartContextProvider } from "./context/CartContext";
import { UserProvider } from "./context/AuthContext";

export default function App() {
  return (
    <>
      <UserProvider>
        <CartContextProvider>
          <StackNavigator />
        </CartContextProvider>
      </UserProvider>
    </>
  );
}
