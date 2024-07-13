import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

// Create a context for the toaster
const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
	const notify = (message, type = "success") => {
		toast(message, {
			type,
		});
	};

	return (
		<ToasterContext.Provider value={{notify}}>
			<Toaster position="bottom-center" reverseOrder={false} />
			{children}
		</ToasterContext.Provider>
	);
};

export const useToaster = () => {
	return useContext(ToasterContext);
};
