# This class provides a liquid tag that prints a rating with 10 chicken icons.
class ChickenRatingTag < Liquid::Tag
  def initialize(tag_name, rating, tokens)
    super
    @rating = rating
  end

  def render(context)
    html = ''
    r = context[@rating].to_i
    unless r.nil?
      for i in 1..r
        html.concat("<img src=\"/assets/icons/chicken.png\" alt=\"Chicken #{i}\" title=\"Rating #{r}/10\" class=\"rating-icon\" />\n")
      end
      for i in r..9
        html.concat("<img src=\"/assets/icons/chicken-bw.png\" alt=\"Chicken #{i}\" title=\"Rating #{r}/10\" class=\"rating-icon\" />\n")
      end
    end
    html
  end

  Liquid::Template.register_tag 'chicken_rating', self
end
