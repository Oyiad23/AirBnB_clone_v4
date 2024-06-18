#!/usr/bin/python3
"""Starts a Flask Web Application"""
from flask import Flask, render_template
from models import storage
from models.state import State
from models.amenity import Amenity
from models.place import Place
import uuid

app = Flask(__name__)

@app.teardown_appcontext
def close_db(error):
    """Remove the current SQLAlchemy Session"""
    storage.close()

@app.route('/100-hbnb', strict_slashes=False)
def hbnb():
    """HBNB is alive!"""
    # Retrieve and sort states
    states = sorted(storage.all(State).values(), key=lambda state: state.name)
    
    # Create a list of states with their sorted cities
    states_with_cities = [
        (state, sorted(state.cities, key=lambda city: city.name))
        for state in states
    ]

    # Retrieve and sort amenities
    amenities = sorted(storage.all(Amenity).values(), key=lambda amenity: amenity.name)
    
    # Retrieve and sort places
    places = sorted(storage.all(Place).values(), key=lambda place: place.name)

    return render_template(
        '100-hbnb.html',
        states=states_with_cities,
        amenities=amenities,
        places=places,
        cache_id=uuid.uuid4()
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

