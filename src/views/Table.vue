<template>
  <!-- Apollo watched Graphql query -->
  <ApolloQuery
    :query="require('../graphql/PageVisits.gql')"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-data-table
          :headers="headers"
          :items="data.pageVisits"
          hide-actions
          item-key="_id"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.path }}</td>
              <td>{{ props.item.ipAddress.query }}</td>
              <td>{{ props.item.ipAddress.city }}</td>
              <td>{{ props.item.ipAddress.region }}</td>
              <td>{{ props.item.ipAddress.country }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-card flat>
              <v-card-text>Map</v-card-text>
              <GmapMap
                :center="{lat: props.item.ipAddress.lat, lng: props.item.ipAddress.lon}"
                :zoom="10"
                style="width: 500px; height: 300px"
              >
                <GmapCircle :center="{lat: props.item.ipAddress.lat, lng: props.item.ipAddress.lon}" :radius="8500" @bounds_changed="updateCircle('bounds', $event)"></GmapCircle>
              </GmapMap>
              
            </v-card>
          </template>
        </v-data-table>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>

 
</template>

<script>
  export default {
    name: 'Table',
    data () {
      return {
        headers: [
          { text: 'Page', value: 'path' },
          { text: 'IP Address', value: 'ipAddress.query' },
          { text: 'City', value: 'ipAddress.city' },
          { text: 'State', value: 'ipAddress.state' },
          { text: 'Country', value: 'ipAddress.country' },
        ],
      }
    }
  }
</script>
