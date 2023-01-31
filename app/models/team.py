from .db import db, environment, SCHEMA, add_prefix_for_prod


class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    user = db.relationship("User", back_populates="teams")
    memberships = db.relationship("Membership", back_populates="team", cascade="all, delete")
    projects = db.relationship("Project", back_populates='team', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'name': self.name,
            'description': self.description
        }
    # the 2 one-to-many relationships method:
    # ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # memberId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # userOwner = db.relationship("User", foreign_keys=[ownerId])
    # userMember = db.relationship("User", foreign_keys=[memberId])
