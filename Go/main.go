package main

import (
	"fmt"
	"time"
)

const conferenceTickets = 50

var conferenceName = "Go conference"
var remainingTickets uint = 50

// var bookings = make([]map[string]string, 0)
var bookings = make([]UserData, 0)

// var bookings []string

type UserData struct {
	firstName       string
	lastName        string
	emailAddress    string
	numberOfTickets uint
}

func main() {
	// var conferenceName = "Go conference"

	// const conferenceTickets = 50
	// var remainingTickets uint = 50

	greetUser()

	// var bookings = [50]string{}
	// var bookings [50]string
	// var bookings []string
	// booking[0] = "Nana"

	for {
		// isValidCity := city == "Singapore" || city == "London"
		// isInvalidCity := city != "Singapore" || city != "London"

		firstName, lastName, emailAddress, userTickets := getUserInput()

		isValidName, isValidEmail, isValidTicketNumber := validateUserInput(firstName, lastName, emailAddress, userTickets)

		if isValidName && isValidEmail && isValidTicketNumber {

			bookTicket(userTickets, firstName, lastName, emailAddress)
			go sendTicket(userTickets, firstName, lastName, emailAddress)

			// printFirstNames(bookings)
			firstNames := getFirstNames()
			// var firstNames = getFirstNames(bookings)
			fmt.Printf("The first names of bookings are: %v\n", firstNames)

			if remainingTickets == 0 {
				fmt.Println("Our conference is booked out. Come back next year")
				break
			}

		} else {

			if !isValidName {
				fmt.Println("First name or last name you entered is too short")
			}

			if !isValidEmail {
				fmt.Println("Email address you entered is invalid")
			}

			if !isValidTicketNumber {
				fmt.Println("Number of tickets you entered in invalid")
			}

			// fmt.Printf("We only have %v ticket remaining , so you can not book %v tickets\n", remainingTickets, userTickets)
			// fmt.Printf("Your input data is invalid ,try again")
			// break
			// continue
		}
	}

	// fmt.Printf("Conference is %T , userName is %T , userTickets is %T\n", conferenceName, userName, userTickets)
}

func greetUser() {
	fmt.Printf("Welcome to %v booking application\n", conferenceName)
	fmt.Printf("We have total of %v tickets and %v are still available.\n", conferenceTickets, remainingTickets)
	fmt.Println("Get your tickets here to attend")
}

func printFirstNames() {
	firstNames := []string{}

	// for _, booking := range bookings {
	// 	var names = strings.Fields(booking)
	// 	firstNames = append(firstNames, names[0])
	// }

	for _, booking := range bookings {
		firstNames = append(firstNames, booking.firstName)
	}

	fmt.Printf("The first names of bookings are: %v\n", firstNames)
}

func getFirstNames() []string {
	firstNames := []string{}

	// for _, booking := range bookings {
	// 	var names = strings.Fields(booking)
	// 	firstNames = append(firstNames, names[0])
	// }

	for _, booking := range bookings {
		firstNames = append(firstNames, booking.firstName)
	}

	return firstNames
}

func getUserInput() (string, string, string, uint) {
	var firstName string
	var lastName string
	var emailAddress string
	var userTickets uint

	fmt.Println("Enter your first name: ")
	fmt.Scan(&firstName)

	fmt.Println("Enter your last name: ")
	fmt.Scan(&lastName)

	fmt.Println("Enter your email address: ")
	fmt.Scan(&emailAddress)

	fmt.Println("Enter number of tickets: ")
	fmt.Scan(&userTickets)

	return firstName, lastName, emailAddress, userTickets
}

func bookTicket(userTickets uint, firstName string, lastName string, emailAddress string) {
	remainingTickets = remainingTickets - userTickets

	var userData = UserData{
		firstName:       firstName,
		lastName:        lastName,
		emailAddress:    emailAddress,
		numberOfTickets: userTickets,
	}

	// userData["firstName"] = firstName
	// userData["lastName"] = lastName
	// userData["emailAddress"] = emailAddress
	// userData["numberOfTickets"] = strconv.FormatUint(uint64(userTickets), 10)
	// var userData map[string]string

	// bookings[0] = firstName + " " + lastName
	bookings = append(bookings, userData)

	fmt.Printf("Thank you %v %v for booking %v tickets. You will receive a confirmation email at %v\n", firstName, lastName, userTickets, emailAddress)
	fmt.Printf("%v ticket remaining for %v\n", remainingTickets, conferenceName)
}

// single threaded mechanism , poor concurrency
// for go routine just "go" infront of the function call
func sendTicket(userTickets uint, firstName string, lastName string, emailAddress string) {
	time.Sleep(10 * time.Second)
	var ticket = fmt.Sprintf("%v tickets for %v %v", userTickets, firstName, lastName)
	fmt.Printf("\n--------------------------------------------------------\n\n")
	fmt.Printf("\nSending ticket %v \nto email address %v\n", ticket, emailAddress)
	fmt.Printf("\n--------------------------------------------------------\n\n")
}
