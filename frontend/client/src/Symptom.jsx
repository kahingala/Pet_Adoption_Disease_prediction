import "bootstrap/dist/css/bootstrap.min.css";

function Symptom() {
    return (
        <div className="container mt-4 p-4" style={{ backgroundColor: "#795548", borderRadius: "10px" }}>
            <h2 className="mb-3 text-center text-white">
                Worried About Your Pet? Get Quick Health Advice Now!
            </h2>
            <form>
                <div className="row">
                    {/* Left Column */}
                    <div className="col-md-6">
                        {renderInput("Animal Type", "Enter animal type")}
                        {renderInput("Breed", "Enter breed")}
                        {renderInput("Gender", "Enter gender")}
                        {renderInput("Weight", "Enter weight")}
                        {renderInput("Symptom 1", "Enter symptom")}
                        {renderInput("Symptom 2", "Enter symptom")}
                        {renderInput("Symptom 3", "Enter symptom")}
                        {renderInput("Symptom 4", "Enter symptom")}
                        {renderInput("Body Temperature", "Enter body temperature")}
                        {renderInput("Heart Rate", "Enter heart rate")}
                    </div>

                    {/* Right Column */}
                    <div className="col-md-6">
                        {renderInput("Duration", "Enter duration")}
                        {renderInput("Appetite Loss", "Enter about appetite")}
                        {renderInput("Vomiting", "Enter about vomiting")}
                        {renderInput("Diarrhea", "Enter about diarrhea")}
                        {renderInput("Coughing", "Enter about coughing")}
                        {renderInput("Labored Breathing", "Enter about labored breathing")}
                        {renderInput("Lameness", "Enter about lameness")}
                        {renderInput("Skin Lesions", "Enter about skin lesions")}
                        {renderInput("Nasal Discharge", "Enter about nasal discharge")}
                        {renderInput("Eye Discharge", "Enter about eye discharge")}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-warning text-dark fw-bold">
                        Predict Disease
                    </button>
                </div>
            </form>
        </div>
    );
}

const renderInput = (label, placeholder) => {
    return (
        <div className="mb-3">
            <label className="form-label text-white"><strong>{label}</strong></label>
            <input type="text" placeholder={placeholder} className="form-control" autoComplete="off" />
        </div>
    );
};

export default Symptom;
