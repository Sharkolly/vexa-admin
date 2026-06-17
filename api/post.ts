import API from "./api";

export const postLoginForm = async (loginDetails: {
  email: string;
  password: string;
}) => {
  const response = await API.post("/login", loginDetails);
  const data = response.data;
  return { message: data.message, success: true };
};

// export const signupApi = async (data: SignupData): Promise<SignupResponse> => {
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   const { idDocument, idVerificationSkipped, ...userData } = data;

//   if (idDocument && idDocument instanceof File) {
//     console.log(
//       `Processing ID document: ${idDocument.name} (${(
//         idDocument.size /
//         1024 /
//         1024
//       ).toFixed(2)}MB)`
//     );
//   }

//   return {
//     data: {
//       message: idVerificationSkipped
//         ? "Signup successful! You can upload ID verification later from your profile."
//         : "Signup successful! Your ID verification is being processed.",
//       success: true,
//       user: {
//         id: Date.now(),
//         ...userData,
//         idVerificationStatus: idVerificationSkipped ? "pending" : "processing",
//         hasIdDocument: !!idDocument,
//       } as User,
//     },
//   };
// };
