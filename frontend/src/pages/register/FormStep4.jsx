import { Group } from "../../styles/form.elements";

const FormStep4 = ({ values, onChange }) => {
	return (
		<>
			<Group>
				<label>Instagram</label>
				<input
					type="text"
					name="instagram"
					placeholder="https://instagram.com/usuario"
					autoComplete="off"
					value={values.instagram}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
		</>
	);
};

export default FormStep4;
