from app.db import db

class TodoModel(db.Model):
    
    __tablename__ = 'todo_info'

    ID = db.Column(db.Integer, primary_key=True)
    TITLE = db.Column(db.String(255))
    DESCRIPTION = db.Column(db.String(5000))
    USER_ID = db.Column(db.Integer, db.ForeignKey('user.ID'))

    def __init__(self, TITLE, DESCRIPTION,USER_ID):
        self.EMAIL = TITLE
        self.PASSWORD = DESCRIPTION
        self.USER_ID = USER_ID
    
    def json(self):
        return{
            "ID": self.ID,
            "TITLE": self.TITLE,
            "DESCRIPTION": self.DESCRIPTION,
        }
    # Saves user to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
