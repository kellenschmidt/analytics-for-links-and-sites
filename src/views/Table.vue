<template>
  <v-data-table
    :headers="headers"
    :items="pageVisitsData"
    item-key="_id"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.path }}</td>
        <td>{{ props.item.referrer }}</td>
        <td>{{ props.item.ipAddress.query }}</td>
        <td>{{ props.item.ipAddress.city }}</td>
        <td>{{ props.item.ipAddress.region }}</td>
        <td>{{ props.item.ipAddress.country }}</td>
        <td>{{ props.item.userAgent.software }}</td>
        <td>{{ props.item.userAgent.operatingSystem }}</td>
        <td>{{ props.item.userAgent.datetime | formatDate }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <!-- <v-card-text>Map</v-card-text> -->
        <GmapMap
          :center="{lat: props.item.ipAddress.lat, lng: props.item.ipAddress.lon}"
          :zoom="10"
          style="width: 500px; height: 300px"
        >
          <GmapCircle :center="{lat: props.item.ipAddress.lat, lng: props.item.ipAddress.lon}" :radius="4000" @bounds_changed="updateCircle('bounds', $event)"></GmapCircle>
        </GmapMap>
        
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      pageVisitsData: Array,
    },
    data () {
      return {
        headers: [
          { text: 'Page', value: 'path' },
          { text: 'Referrer', value: 'referrer' },
          { text: 'IP Address', value: 'ipAddress.query' },
          { text: 'City', value: 'ipAddress.city' },
          { text: 'State', value: 'ipAddress.state' },
          { text: 'Country', value: 'ipAddress.country' },
          { text: 'Browser', value: 'userAgent.software' },
          { text: 'Operating System', value: 'userAgent.operatingSystem' },
          { text: 'Date', value: 'userAgent.datetime' },
        ],
      }
    }
  }
</script>
