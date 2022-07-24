from app.db import db

class TodoModel(db.Model):
    
    __tablename__ = 'todo_info'

    ID = db.Column(db.Integer, primary_key=True)
    TITLE = db.Column(db.String(1000))
    DESCRIPTION = db.Column(db.String(5000))
    USER_ID = db.Column(db.Integer, db.ForeignKey('user.ID'))
    COMPLETED = db.Column(db.Boolean)

    def __init__(self, TITLE, DESCRIPTION,USER_ID,COMPLETED):
        self.TITLE = TITLE
        self.DESCRIPTION = DESCRIPTION
        self.USER_ID = USER_ID
        self.COMPLETED = COMPLETED
    
    def json(self):
        return{
            "ID": self.ID,
            "TITLE": self.TITLE,
            "DESCRIPTION": self.DESCRIPTION,
            "COMPLETED": self.COMPLETED
        }
    # Saves todo to db
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    # Deletes todo from db
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
