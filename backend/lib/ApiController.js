class ApiController {
   constructor(
      model,
      getQuery = [],
      postBody = [],
      populateObj = [],
      projectionFields = []
   ) {
      this.model = model
      this.getQuery = getQuery
      this.postBody = postBody
      this.populateObj = populateObj
      this.projectionFields = ['__v', ...projectionFields]
   }

   async get(req, res) {
      try {
         const { query } = req
         const items = this.getQuery.map((item) =>
            query[item] ? { [item]: query[item] } : {}
         )
         const projectionStr = this.projectionFields
            .map((value) => `-${value}`)
            .join(' ')

         const response = await this.model
            .find(
               {
                  $and: items
               },
               projectionStr
            )
            .populate(this.populateObj)
         res.status(200).json({
            message: 'Pobrano pomyślnie',
            data: response
         })
         return response
      } catch (e) {
         console.log(e)
         res.status(400).json({
            message: 'Coś poszło nie tak'
         })
      }
   }

   async post(req, res, payload) {
      const foundObject = await this.model.findOne(payload)

      if (foundObject) {
         res.status(400).json({
            message: 'Istnieje już taki rekord w bazie danych',
            data: foundObject
         })
      } else {
         const resp = await this.model.create(payload)
         return resp
      }
   }

   async buildBody(req, res) {
      this.postBody.some((key) => {
         if (!req.body[key]) {
            res.status(400).json({
               message: `Brak wymaganego pola: ${key}`
            })
         }
      })
      try {
         return this.postBody.reduce(
            (o, key) => ({ ...o, [key]: req.body[key] }),
            {}
         )
      } catch (e) {
         console.error(e)
         res.status(500).json({
            message: 'Coś poszło nie tak'
         })
      }
   }
}

module.exports = ApiController
