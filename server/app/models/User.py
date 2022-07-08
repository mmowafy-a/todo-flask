from app.db import db

class UserModel(db.Model):
    
    __tablename__ = 'user'

    ID = db.Column(db.Integer, primary_key=True)
    EMAIL = db.Column(db.String(255), nullable=False)
    PASSWORD = db.Column(db.String(2000), nullable=False)

    def __init__(self, EMAIL, PASSWORD):
        self.EMAIL = EMAIL
        self.PASSWORD = PASSWORD
    
    # Saves user to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
