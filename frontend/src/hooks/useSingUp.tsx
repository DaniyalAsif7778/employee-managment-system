function useSingUp(
  name: string,
  debounceEmail: string,
  debouncePassword: string,
  role: string,
  setEmailError: React.Dispatch<React.SetStateAction<string>>,
  setPasswordError: React.Dispatch<React.SetStateAction<string>>
) {
  const signUpHandler = () => {}

  return { signUpHandler }
}

export default useSingUp
