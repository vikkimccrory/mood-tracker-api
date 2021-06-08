#!/bin/bash

API="http://localhost:4741"
URL_PATH="/entries"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "entry": {
      "mood": [{
      "happiness": "'"${HAPPINESS}"'",
      "sadness": "'"${SADNESS}"'",
      "anxiety": "'"${ANXIETY}"'",
      "irritability": "'"${IRRITABILITY}"'",
      "energetic": "'"${ENERGETIC}"'",
      "calm": "'"${CALM}"'",
      "confident": "'"${CONFIDENT}"'"
    }],
      "dayDetails": "'"${DAYDETAILS}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
