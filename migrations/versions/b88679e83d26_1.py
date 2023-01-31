"""1

Revision ID: b88679e83d26
Revises:
Create Date: 2023-01-31 11:00:32.836133

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'b88679e83d26'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
      op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('teams',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
      op.execute(f"ALTER TABLE teams SET SCHEMA {SCHEMA};")

    op.create_table('memberships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('membershipId', sa.Integer(), nullable=True),
    sa.Column('teamId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['membershipId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['teamId'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
      op.execute(f"ALTER TABLE memberships SET SCHEMA {SCHEMA};")

    op.create_table('projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownerId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=4000), nullable=False),
    sa.Column('teamId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['ownerId'], ['users.id'], ),
    sa.ForeignKeyConstraint(['teamId'], ['teams.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
      op.execute(f"ALTER TABLE projects SET SCHEMA {SCHEMA};")

    op.create_table('tasks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('projectId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('stageId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['projectId'], ['projects.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
      op.execute(f"ALTER TABLE tasks SET SCHEMA {SCHEMA};")


    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    op.drop_table('projects')
    op.drop_table('memberships')
    op.drop_table('teams')
    op.drop_table('users')
    # ### end Alembic commands ###
