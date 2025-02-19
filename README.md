# Breast Cancer Prediction using Machine Learning

## 📖 Overview  
This project is a **web-based application** that predicts the likelihood of breast cancer using a machine learning model. Users can input medical data through a user-friendly interface and receive real-time predictions. The backend hosts a trained model, while the frontend ensures a seamless user experience.

### 🚀 Live Demo  
🔗 [Breast Cancer Prediction App](https://breastcancerpredictionml.netlify.app/)

---

## ✨ Features  
✅ User-friendly web interface  
✅ Real-time breast cancer prediction  
✅ Seamless integration of machine learning model  
✅ Responsive and clean design  

---

## 🛠️ Technologies Used  
- **Frontend:** HTML, CSS, react, vite.  
- **Backend:** Python *Flask*  
- **Machine Learning:** Scikit-learn, Pandas.  
- **Deployment:** Netlify *(Frontend)*, Heroku *(Backend)*  

---

## 📊 Dataset  
The machine learning model is trained on the **Breast Cancer Wisconsin (Diagnostic)** dataset from the UCI Machine Learning Repository.  
- **Features:** Mean radius, mean texture, mean perimeter, etc.  
- **Labels:** Malignant or Benign  

---

## 📂 Project Structure  
```plaintext
├── breast_cancer_predictionv2.ipynb  # Model training and evaluation notebook
├── website/                          # Frontend code
│   ├── index.html                    # Main HTML file
│   ├── styles.css                    # Stylesheet
│   └── script.js                     # JavaScript logic and API calls
├── requirements.txt                  # Project dependencies
├── app.py                            # Backend API for model integration
└── README.md                         # Project documentation
```

---

## ⚙️ Installation & Setup  
### 📦 Backend (Machine Learning Model)  
1. **Clone the repository:**  
   ```bash
   git clone <repository-url>
   cd breast-cancer-prediction
   ```
2. **Set up a virtual environment:**  
   ```bash
   python -m venv venv
   # Activate the environment
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies:**  
   ```bash
   pip install -r requirements.txt
   ```
4. **Train and save the model:**  
   Run the Jupyter notebook `breast_cancer_predictionv2.ipynb` to train the model and export it.  
5. **Start the backend server (if applicable):**  
   ```bash
   python app.py
   ```

### 🌐 Frontend (Website)  
1. **Navigate to the website directory:**  
   ```bash
   cd website
   ```
2. **Run locally:**  
   Open `index.html` in your browser or use a local server.  
3. **Deploy:**  
   Deploy via Netlify or any static site hosting platform.  

---

## 🖥️ Usage  
1. Open the [live website](https://breastcancerpredictionml.netlify.app/).  
2. Enter the required medical data into the input fields.  
3. Click the **Predict** button to receive the prediction results.  

---

## 📈 Results  
✅ Model Accuracy: **98.6%** 
✅ High precision and recall on test data.  

---

## 🚀 Future Improvements  
- 🔍 Enhance model accuracy with advanced algorithms.  
- 📝 Add user authentication and data history tracking.  
- 🎨 Improve UI/UX with animations and better data visualizations.  
- 📡 Implement API rate limiting and security features.  

---

## 👨‍💻 Contributors  
- Kishan km – Project Lead & Developer
- 
---

## 📝 License  
This project is licensed under the **MIT License**. See `LICENSE` for details.  

---

## 🙏 Acknowledgments  
- UCI Machine Learning Repository for providing the dataset. 

---

> *Feel free to fork this project, contribute, and share your feedback!* 🚀

