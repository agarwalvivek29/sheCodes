from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
from rasa_sdk.events import ConversationPaused, UserUtteranceReverted

class ActionSaveHomeSize(Action):

    def name(self) -> Text:
        return "action_save_home_size"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        home_size = next(tracker.get_latest_entity_values("home_size"), None)
        return [SlotSet("home_size", home_size)]

class ActionSaveTransportMode(Action):

    def name(self) -> Text:
        return "action_save_transport_mode"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        transport_mode = next(tracker.get_latest_entity_values("transport_mode"), None)
        return [SlotSet("transport_mode", transport_mode)]

class ActionSaveFoodHabits(Action):

    def name(self) -> Text:
        return "action_save_food_habits"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        food_habits = next(tracker.get_latest_entity_values("food_habits"), None)
        return [SlotSet("food_habits", food_habits)]

class ActionSaveEnergyUsage(Action):

    def name(self) -> Text:
        return "action_save_energy_usage"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        energy_usage = next(tracker.get_latest_entity_values("energy_usage"), None)
        return [SlotSet("energy_usage", energy_usage)]

class ActionCalculateCarbonFootprint(Action):

    def name(self) -> Text:
        return "action_calculate_carbon_footprint"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        home_size = tracker.get_slot("home_size")
        transport_mode = tracker.get_slot("transport_mode")
        food_habits = tracker.get_slot("food_habits")
        energy_usage = tracker.get_slot("energy_usage")

        # Calculate carbon footprint based on the provided information
        carbon_footprint = self.calculate_footprint(home_size, transport_mode, food_habits, energy_usage)
        
        dispatcher.utter_message(text=f"Based on the information provided, your estimated carbon footprint is {carbon_footprint} tons of CO2 per year.")
        return [SlotSet("carbon_footprint", carbon_footprint)]

    def calculate_footprint(self, home_size, transport_mode, food_habits, energy_usage):
        # Implement your carbon footprint calculation logic here
        home_size_factor = int(home_size) * 0.5  # Example factor
        transport_factor = 2 if transport_mode == 'car' else 0.5
        food_factor = 2 if food_habits == 'non-vegetarian' else 0.5
        energy_factor = int(energy_usage) * 0.3

        total_footprint = home_size_factor + transport_factor + food_factor + energy_factor
        return round(total_footprint, 2)


class ActionSaveIndustryType(Action):

    def name(self) -> Text:
        return "action_save_industry_type"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        industry_type = next(tracker.get_latest_entity_values("industry_type"), None)
        return [SlotSet("industry_type", industry_type)]

class ActionSaveEmployeesCount(Action):

    def name(self) -> Text:
        return "action_save_employees_count"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        employees_count = next(tracker.get_latest_entity_values("employees_count"), None)
        return [SlotSet("employees_count", employees_count)]

class ActionSaveEnergy(Action):

    def name(self) -> Text:
        return "action_save_energy"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        energy = next(tracker.get_latest_entity_values("energy_usage"), None)
        return [SlotSet("energy_usage", energy)]

class ActionSaveTransportUsage(Action):

    def name(self) -> Text:
        return "action_save_transport_usage"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        transport_usage = next(tracker.get_latest_entity_values("transport_usage"), None)
        return [SlotSet("transport_usage", transport_usage)]

class ActionCalculateCompanyCarbonFootprint(Action):

    def name(self) -> Text:
        return "action_calculate_company_carbon_footprint"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        industry_type = tracker.get_slot("industry_type")
        employees_count = tracker.get_slot("employees_count")
        energy_usage = tracker.get_slot("energy_usage")
        transport_usage = tracker.get_slot("transport_usage")

        # Calculate carbon footprint based on the provided information
        carbon_footprint = self.calculate_company_footprint(industry_type, employees_count, energy_usage, transport_usage)
        
        dispatcher.utter_message(text=f"Based on the information provided, your estimated carbon footprint is {carbon_footprint} tons of CO2 per year.")
        return [SlotSet("carbon_footprint", carbon_footprint)]

    def calculate_company_footprint(self, industry_type, employees_count, energy_usage, transport_usage):
        # Implement your carbon footprint calculation logic here
        industry_factor = 1.5 if industry_type == 'manufacturing' else 1.0  # Example factors
        employees_factor = int(employees_count) * 0.1
        energy_factor = int(energy_usage) * 0.3
        transport_factor = int(transport_usage) * 2

        total_footprint = industry_factor + employees_factor + energy_factor + transport_factor
        return round(total_footprint, 2)

class ActionGoodbye(Action):

    def name(self) -> Text:
        return "action_goodbye"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[Dict]:
        dispatcher.utter_message(text="Thank you for chatting with us! sGoodbye!")
        return [ConversationPaused()]